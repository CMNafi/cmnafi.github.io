import { buildFormAdvLinks } from './firms';

export interface StarterFormAdvSnapshot {
  snapshotDate: string;
  crd: string;
  firmName: string;
  legalName?: string;
  secNumber?: string;
  aliases?: string[];
  headquarters?: string;
  country?: string;
  phone?: string;
  website?: string;
  registrationSnapshot: string;
  serviceSnapshot?: string;
  feeSnapshot?: string;
  brochureAudiences?: string[];
  stateRegistrations?: string[];
  focusTags?: string[];
  nextRead?: string;
  notes?: string[];
  sourceCoverage?: string[];
  aumBucket?: string;
  clientFocus?: string[];
  officeCount?: number;
  disclosureCount?: number;
  latestChanges?: string[];
  links: ReturnType<typeof buildFormAdvLinks>;
}

export const starterFormAdvSnapshots: StarterFormAdvSnapshot[] = [
  {
    snapshotDate: '2025-11-01',
    crd: '300050',
    firmName: 'Gamma Asset Management LLC',
    legalName: 'Gamma Asset Management LLC',
    secNumber: '801-129754',
    headquarters: 'San Juan, Puerto Rico',
    country: 'United States',
    phone: '787-957-3260',
    registrationSnapshot: 'SEC-registered adviser with a current ADV amendment on file in late 2025.',
    serviceSnapshot:
      'Advisory services include portfolio management, research, and financial advice for individuals, high net worth clients, corporations, and institutions.',
    focusTags: ['SEC-registered', 'portfolio management', 'institutional reach'],
    nextRead: 'Open the ADV PDF first for identity, office, and filing status, then use CRS to understand the client-facing service split.',
    notes: ['Starter fallback snapshot for seeded history mode.'],
    sourceCoverage: ['ADV Part 1', 'Form CRS'],
    aumBucket: '$1B+',
    clientFocus: ['Individuals', 'High net worth', 'Institutions'],
    officeCount: 1,
    disclosureCount: 0,
    latestChanges: ['Prior seeded snapshot before March 2026 update.'],
    links: buildFormAdvLinks('300050')
  },
  {
    snapshotDate: '2026-03-14',
    crd: '300050',
    firmName: 'Gamma Asset Management LLC',
    legalName: 'Gamma Asset Management LLC',
    secNumber: '801-129754',
    headquarters: 'San Juan, Puerto Rico',
    country: 'United States',
    phone: '787-957-3260',
    registrationSnapshot: 'SEC-registered adviser with a current ADV amendment dated March 14, 2026.',
    serviceSnapshot:
      'Advisory services include asset and portfolio management, research, and financial advice for individuals, high net worth clients, corporations, institutions, and other entities.',
    focusTags: ['SEC-registered', 'portfolio management', 'institutional reach'],
    nextRead: 'Open the ADV PDF first for identity, office, and filing status, then use CRS to understand the client-facing service split.',
    notes: ['The ADV PDF exposes clean Item 1 identity data: SEC file number, office address, hours, and phone.'],
    sourceCoverage: ['ADV Part 1', 'Form CRS'],
    aumBucket: '$1B+',
    clientFocus: ['Individuals', 'High net worth', 'Institutions', 'Other entities'],
    officeCount: 1,
    disclosureCount: 0,
    latestChanges: ['March 2026 filing expanded the visible client mix language in the seeded record.'],
    links: buildFormAdvLinks('300050')
  },
  {
    snapshotDate: '2025-12-01',
    crd: '300031',
    firmName: 'Equity Advisors, LLC',
    legalName: 'Equity Advisors, LLC',
    aliases: ['Shockwave Advisors'],
    headquarters: 'Zephyr Cove, Nevada',
    registrationSnapshot: 'Multi-state adviser summary showed an approved registration footprint across several states.',
    stateRegistrations: ['Alabama', 'California', 'Florida', 'Missouri', 'Nevada', 'New Jersey'],
    focusTags: ['multi-state footprint', 'alias resolution'],
    nextRead: 'Start with the summary page to validate the business names and state registrations before opening the ADV PDF.',
    sourceCoverage: ['Firm summary'],
    aumBucket: '$250M-$1B',
    clientFocus: ['Individuals', 'Retirement accounts'],
    officeCount: 1,
    disclosureCount: 0,
    latestChanges: ['Previous seeded state footprint.'],
    links: buildFormAdvLinks('300031')
  },
  {
    snapshotDate: '2026-03-01',
    crd: '300031',
    firmName: 'Equity Advisors, LLC',
    legalName: 'Equity Advisors, LLC',
    aliases: ['Shockwave Advisors', 'Lifelong Retirement Corp'],
    headquarters: 'Zephyr Cove, Nevada',
    registrationSnapshot:
      'Summary page shows approved registrations across Alabama, California, Florida, Missouri, Nevada, New Jersey, North Carolina, and Pennsylvania.',
    stateRegistrations: ['Alabama', 'California', 'Florida', 'Missouri', 'Nevada', 'New Jersey', 'North Carolina', 'Pennsylvania'],
    focusTags: ['multi-state footprint', 'alias resolution'],
    nextRead: 'Start with the summary page to validate the business names and state registrations before opening the ADV PDF.',
    sourceCoverage: ['Firm summary'],
    aumBucket: '$250M-$1B',
    clientFocus: ['Individuals', 'Retirement accounts'],
    officeCount: 1,
    disclosureCount: 0,
    latestChanges: ['North Carolina and Pennsylvania appear in the seeded registration footprint.', 'One more alternate business name is surfaced.'],
    links: buildFormAdvLinks('300031')
  },
  {
    snapshotDate: '2025-12-15',
    crd: '285554',
    firmName: 'Earth Equity Advisors, LLC',
    legalName: 'Earth Equity Advisors, LLC',
    registrationSnapshot: 'Retail-focused adviser with a clear split between digital and advisor-led service.',
    serviceSnapshot:
      'Offers portfolio management and financial planning to retail clients through an online channel and a dedicated-advisor channel.',
    feeSnapshot: 'Digital accounts start at 0.75% annually, with a higher advisor-led tier.',
    focusTags: ['retail', 'financial planning'],
    nextRead: 'Open the CRS first because the service channels and fee schedule are already laid out clearly there.',
    sourceCoverage: ['Form CRS'],
    aumBucket: '$100M-$250M',
    clientFocus: ['Retail'],
    officeCount: 1,
    disclosureCount: 0,
    latestChanges: ['Earlier seeded fee language.'],
    links: buildFormAdvLinks('285554')
  },
  {
    snapshotDate: '2026-03-01',
    crd: '285554',
    firmName: 'Earth Equity Advisors, LLC',
    legalName: 'Earth Equity Advisors, LLC',
    registrationSnapshot: 'Retail-focused adviser with a Form CRS that cleanly separates service channels and fee schedules.',
    serviceSnapshot:
      'Offers portfolio management and financial planning to retail clients through an online channel and a dedicated-advisor channel focused on responsible investing.',
    feeSnapshot:
      'Form CRS shows a 0.75% annual fee for ALIGN DIGITAL accounts and a tiered fee up to 1.25% for dedicated advisory accounts, plus custodial costs.',
    focusTags: ['retail', 'financial planning', 'fee clarity'],
    nextRead: 'Open the CRS first because the service channels and fee schedule are already laid out clearly there.',
    sourceCoverage: ['Form CRS'],
    aumBucket: '$100M-$250M',
    clientFocus: ['Retail'],
    officeCount: 1,
    disclosureCount: 0,
    latestChanges: ['Seeded fee detail now includes the named digital and dedicated-advisor channels.', 'Responsible investing language is clearer in the service summary.'],
    links: buildFormAdvLinks('285554')
  },
  {
    snapshotDate: '2026-03-01',
    crd: '309893',
    firmName: 'Hand Capital Management',
    legalName: 'Hand Capital Management',
    registrationSnapshot: 'ADV Part 2 brochure references are visible directly inside the official ADV PDF.',
    brochureAudiences: ['Individuals', 'Foundations/charities', 'Private funds or pools'],
    focusTags: ['brochure check', 'private funds'],
    nextRead: 'Open the ADV PDF and go straight to the brochure table to understand who the documents were written for.',
    sourceCoverage: ['ADV Part 2 brochure table'],
    aumBucket: 'Not surfaced yet',
    clientFocus: ['Individuals', 'Private funds'],
    officeCount: 1,
    disclosureCount: 0,
    latestChanges: ['Seeded record is brochure-oriented rather than fee-oriented.'],
    links: buildFormAdvLinks('309893')
  },
  {
    snapshotDate: '2026-03-01',
    crd: '155243',
    firmName: 'Eightsky Mountains Capital Management, LLC',
    legalName: 'Eightsky Mountains Capital Management, LLC',
    aliases: ['Eightsky Mountains (ESMCM)'],
    headquarters: 'Seattle, Washington',
    phone: '206-420-6624',
    registrationSnapshot: 'ADV Part 1 gives a clean Seattle office record with current contact information and business hours.',
    focusTags: ['office context', 'identity check'],
    nextRead: 'Use the ADV PDF first to verify the operating office, contact info, and naming before going deeper.',
    sourceCoverage: ['ADV Part 1'],
    aumBucket: 'Not surfaced yet',
    clientFocus: ['Open'],
    officeCount: 1,
    disclosureCount: 0,
    latestChanges: ['Seeded identity snapshot focused on office and contact verification.'],
    links: buildFormAdvLinks('155243')
  },
  {
    snapshotDate: '2025-10-01',
    crd: '269916',
    firmName: 'Signal Partners, LLC',
    legalName: 'Signal Partners, LLC',
    phone: '206-669-8961',
    registrationSnapshot: 'ADV Part 1 showed a by-appointment operating model.',
    focusTags: ['operating footprint'],
    nextRead: 'Open the ADV PDF to validate office footprint and how substantial the platform looks operationally.',
    sourceCoverage: ['ADV Part 1'],
    aumBucket: 'Not surfaced yet',
    clientFocus: ['Open'],
    officeCount: 1,
    disclosureCount: 0,
    latestChanges: ['Earlier seeded footprint before additional office context was added.'],
    links: buildFormAdvLinks('269916')
  },
  {
    snapshotDate: '2026-03-01',
    crd: '269916',
    firmName: 'Signal Partners, LLC',
    legalName: 'Signal Partners, LLC',
    phone: '206-669-8961',
    registrationSnapshot: 'ADV Part 1 shows a by-appointment operating model and confirms one additional office beyond the principal place of business.',
    focusTags: ['office count', 'operating footprint'],
    nextRead: 'Open the ADV PDF to validate office footprint and how substantial the platform looks operationally.',
    sourceCoverage: ['ADV Part 1'],
    aumBucket: 'Not surfaced yet',
    clientFocus: ['Open'],
    officeCount: 2,
    disclosureCount: 0,
    latestChanges: ['One additional office is surfaced in the seeded operational snapshot.'],
    links: buildFormAdvLinks('269916')
  }
];
