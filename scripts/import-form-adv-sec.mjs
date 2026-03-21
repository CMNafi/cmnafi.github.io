import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';

const args = process.argv.slice(2);

const usage = `Usage:
  node scripts/import-form-adv-sec.mjs <path-to-xlsx-or-delimited-file> [--snapshot-date YYYY-MM-DD] [--limit N] [--crds 12345,67890] [--out ./tmp/form-adv-preview.json]

Notes:
  - Use an extracted SEC file. If you downloaded a zip, extract it first.
  - Supports .xlsx, .csv, .txt, and .psv / pipe-delimited text files.
  - If SUPABASE_SERVICE_ROLE_KEY is present, rows will be upserted into public.form_adv_firm_snapshots.
`;

if (!args.length || args.includes('--help')) {
  console.log(usage);
  process.exit(0);
}

const positional = [];
const options = {};

for (let index = 0; index < args.length; index += 1) {
  const token = args[index];
  if (token.startsWith('--')) {
    options[token.slice(2)] = args[index + 1] && !args[index + 1].startsWith('--') ? args[++index] : 'true';
    continue;
  }
  positional.push(token);
}

const inputPath = path.resolve(positional[0]);
if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const snapshotDate = options['snapshot-date'] || new Date().toISOString().slice(0, 10);
const limit = options.limit ? Number(options.limit) : null;
const allowedCRDs = options.crds ? new Set(String(options.crds).split(',').map((value) => value.trim()).filter(Boolean)) : null;
const outputPath = options.out ? path.resolve(options.out) : null;

const normalizeHeader = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const splitMultiValue = (value) =>
  String(value || '')
    .split(/[\|;,]+/g)
    .map((part) => part.trim())
    .filter(Boolean);

const makeHeadquarters = (row) => {
  const city = getValue(row, ['mainofficecity', 'city', 'businesscity']);
  const state = getValue(row, ['mainofficestate', 'state', 'businessstate']);
  const country = getValue(row, ['mainofficecountry', 'country', 'businesscountry']);
  return [city, state || country].filter(Boolean).join(', ');
};

const pickAumBucket = (value) => {
  const numeric = Number(String(value || '').replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(numeric) || numeric <= 0) return '';
  if (numeric >= 1000000000) return '$1B+';
  if (numeric >= 250000000) return '$250M-$1B';
  if (numeric >= 100000000) return '$100M-$250M';
  if (numeric >= 25000000) return '$25M-$100M';
  return 'Under $25M';
};

const parseBooleanLike = (value) => {
  const normalized = String(value || '').trim().toLowerCase();
  if (!normalized) return 0;
  if (['y', 'yes', 'true', '1'].includes(normalized)) return 1;
  if (['n', 'no', 'false', '0'].includes(normalized)) return 0;
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : 0;
};

const getDisclosureCount = (row) =>
  [
    'criminaldisclosures',
    'regulatoryactiondisclosures',
    'civiljudicialdisclosures',
    'bankruptcydisclosures',
    'judgmentliendisclosures',
    'bondpayoutdisclosures',
    'arbitrationdisclosures',
    'selfregulatoryorganizationdisclosures'
  ].reduce((sum, key) => sum + parseBooleanLike(row[key]), 0);

function getValue(row, aliases) {
  for (const alias of aliases) {
    const value = row[normalizeHeader(alias)];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value).trim();
    }
  }
  return '';
}

const buildRegistrationSnapshot = (row) => {
  const status = getValue(row, ['registrationstatus', 'regulatorystatus', 'status']);
  const date = getValue(row, ['effectivedate', 'registrationeffectivedate', 'asofdate']);
  if (status && date) return `${status} as of ${date}.`;
  if (status) return status;
  if (date) return `Latest filing date in source file: ${date}.`;
  return 'Registration detail imported from the SEC adviser dataset.';
};

const deriveClientFocus = (row, serviceSnapshot) => {
  const explicit = splitMultiValue(getValue(row, ['clienttypes', 'typesofclients', 'clientfocus']));
  if (explicit.length) return explicit;

  const lower = String(serviceSnapshot || '').toLowerCase();
  const derived = [];
  if (lower.includes('retail') || lower.includes('individual')) derived.push('Retail');
  if (lower.includes('institution')) derived.push('Institutions');
  if (lower.includes('high net worth')) derived.push('High net worth');
  return derived;
};

const deriveFocusTags = ({ disclosureCount, serviceSnapshot, stateRegistrations, officeCount, aumBucket }) => {
  const tags = [];
  if (disclosureCount > 0) tags.push('disclosures');
  if (serviceSnapshot?.toLowerCase().includes('retail')) tags.push('retail');
  if (serviceSnapshot?.toLowerCase().includes('institution')) tags.push('institutional');
  if (stateRegistrations?.length >= 5) tags.push('multi-state');
  if ((officeCount || 0) > 1) tags.push('multi-office');
  if (aumBucket) tags.push(aumBucket);
  return tags;
};

const compareFields = [
  ['firm_name', 'Firm name changed'],
  ['legal_name', 'Legal name changed'],
  ['headquarters', 'Headquarters changed'],
  ['phone', 'Phone changed'],
  ['registration_snapshot', 'Registration snapshot changed'],
  ['service_snapshot', 'Service summary changed'],
  ['fee_snapshot', 'Fee summary changed'],
  ['aum_bucket', 'AUM bucket changed'],
  ['office_count', 'Office count changed'],
  ['disclosure_count', 'Disclosure count changed']
];

const buildLatestChanges = (row, previousRow) => {
  if (!previousRow) return ['First tracked snapshot in this workspace.'];
  const changes = compareFields
    .filter(([field]) => JSON.stringify(previousRow[field] ?? null) !== JSON.stringify(row[field] ?? null))
    .map(([, label]) => label);
  return changes.length ? changes : ['No normalized field changes detected against the previous snapshot.'];
};

const readRows = (filePath) => {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === '.xlsx' || extension === '.xls') {
    const workbook = XLSX.readFile(filePath);
    const firstSheet = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { defval: '' });
    return rows.map((row) =>
      Object.fromEntries(Object.entries(row).map(([key, value]) => [normalizeHeader(key), value]))
    );
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const delimiter = extension === '.csv' ? ',' : raw.includes('|') ? '|' : '\t';
  const [headerLine, ...lines] = raw.split(/\r?\n/g).filter(Boolean);
  const headers = headerLine.split(delimiter).map(normalizeHeader);

  return lines.map((line) => {
    const cells = line.split(delimiter);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
  });
};

const rawRows = readRows(inputPath);

let normalizedRows = rawRows
  .map((row) => {
    const crd = getValue(row, ['crd', 'crdnumber', 'organizationcrdnumber', 'iardcrdnumber', 'iardnumber']);
    const firmName = getValue(row, ['primarybusinessname', 'firmname', 'businessname', 'advisername', 'name']);
    if (!(crd && firmName)) return null;

    const serviceSnapshot = getValue(row, ['typesofadvisoryactivities', 'typesofadvisoryservices', 'advisoryactivities']);
    const stateRegistrations = splitMultiValue(getValue(row, ['stateregistrations', 'statesregistered']));
    const disclosureCount = getDisclosureCount(row);
    const aumBucket = pickAumBucket(getValue(row, ['assetsundermanagement', 'regulatoryassetsundermanagement', 'aum']));
    const officeCountRaw = getValue(row, ['numberofoffices', 'officecount']);
    const officeCount = officeCountRaw ? Number(officeCountRaw) : null;

    const record = {
      snapshot_date: snapshotDate,
      crd,
      firm_name: firmName,
      legal_name: getValue(row, ['legalname', 'fulllegalname']),
      sec_number: getValue(row, ['secfilenumber', 'secnumber', 'secfile']),
      aliases: splitMultiValue(getValue(row, ['otherbusinessnames', 'aliases', 'othernames'])),
      headquarters: makeHeadquarters(row),
      country: getValue(row, ['mainofficecountry', 'country', 'businesscountry']),
      phone: getValue(row, ['mainofficephonenumber', 'phonenumber', 'telephone', 'phone']),
      website: getValue(row, ['websiteaddress', 'website', 'webaddress']),
      registration_snapshot: buildRegistrationSnapshot(row),
      service_snapshot: serviceSnapshot,
      fee_snapshot: getValue(row, ['feeschedule', 'feeinformation', 'fees']),
      brochure_audiences: splitMultiValue(getValue(row, ['brochureaudiences'])),
      state_registrations: stateRegistrations,
      focus_tags: [],
      next_read: '',
      notes: [],
      source_coverage: ['SEC IA dataset'],
      aum_bucket: aumBucket,
      client_focus: deriveClientFocus(row, serviceSnapshot),
      office_count: Number.isFinite(officeCount) ? officeCount : null,
      disclosure_count: disclosureCount,
      latest_changes: [],
      raw_record: row
    };

    record.focus_tags = deriveFocusTags({
      disclosureCount,
      serviceSnapshot,
      stateRegistrations,
      officeCount: record.office_count,
      aumBucket
    });
    record.next_read = disclosureCount > 0
      ? 'Start with the current filing and disclosure context before moving into service detail.'
      : 'Start with the current filing, confirm registration status, and then read the service language.';
    record.notes = [`Imported from ${path.basename(filePath)} on ${new Date().toISOString()}.`];
    return record;
  })
  .filter(Boolean);

if (allowedCRDs) {
  normalizedRows = normalizedRows.filter((row) => allowedCRDs.has(row.crd));
}

if (limit) {
  normalizedRows = normalizedRows.slice(0, limit);
}

if (!normalizedRows.length) {
  console.error('No usable adviser rows were found after normalization.');
  process.exit(1);
}

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const canWriteSupabase = Boolean(supabaseUrl && serviceRoleKey);

const chunk = (items, size) => {
  const groups = [];
  for (let index = 0; index < items.length; index += size) groups.push(items.slice(index, index + size));
  return groups;
};

const buildPreviousRowMap = async (client, crds) => {
  const previous = new Map();
  const chunks = chunk(crds, 100);

  for (const batch of chunks) {
    const { data, error } = await client
      .from('form_adv_current_firms')
      .select('crd, firm_name, legal_name, headquarters, phone, registration_snapshot, service_snapshot, fee_snapshot, aum_bucket, office_count, disclosure_count')
      .in('crd', batch);

    if (error) {
      throw new Error(`Could not read form_adv_current_firms: ${error.message}`);
    }

    for (const row of data || []) previous.set(row.crd, row);
  }

  return previous;
};

if (canWriteSupabase) {
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const previousRows = await buildPreviousRowMap(supabase, normalizedRows.map((row) => row.crd));
  normalizedRows = normalizedRows.map((row) => ({
    ...row,
    latest_changes: buildLatestChanges(row, previousRows.get(row.crd))
  }));

  for (const batch of chunk(normalizedRows, 250)) {
    const { error } = await supabase
      .from('form_adv_firm_snapshots')
      .upsert(batch, { onConflict: 'snapshot_date,crd' });

    if (error) {
      throw new Error(`Supabase upsert failed: ${error.message}`);
    }
  }
}

if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(normalizedRows, null, 2));
}

const summary = {
  snapshotDate,
  inputPath,
  rowsRead: rawRows.length,
  rowsNormalized: normalizedRows.length,
  wrotePreviewJson: Boolean(outputPath),
  wroteSupabase: canWriteSupabase,
  sample: normalizedRows.slice(0, 3).map((row) => ({
    crd: row.crd,
    firm_name: row.firm_name,
    disclosure_count: row.disclosure_count,
    latest_changes: row.latest_changes
  }))
};

console.log(JSON.stringify(summary, null, 2));
