import type {
  ADVData,
  Entity,
  FilingSnapshot,
  GenericSecApiRecord,
  Holding,
  SecApiEnvelope,
  ThirteenFCoverPage,
  ThirteenFHoldingEntry,
  ThirteenFHoldingsFiling
} from "@/types/finance";

import { formatCurrency } from "@/lib/format";

const SEC_API_BASE = "https://api.sec-api.io";

function getSecApiKey(): string {
  const apiKey = process.env.SEC_API_KEY;
  if (!apiKey) {
    throw new Error("SEC_API_KEY is not configured.");
  }

  return apiKey;
}

async function secApiPost<T>(path: string, payload: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${SEC_API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getSecApiKey()
    },
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`SEC API request failed with ${response.status} at ${path}.`);
  }

  return (await response.json()) as T;
}

async function secApiGet<T>(path: string): Promise<T> {
  const url = new URL(`${SEC_API_BASE}${path}`);
  url.searchParams.set("token", getSecApiKey());

  const response = await fetch(url.toString(), {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`SEC API request failed with ${response.status} at ${path}.`);
  }

  return (await response.json()) as T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getPathValue(input: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (!isRecord(current)) {
      return undefined;
    }

    return current[segment];
  }, input);
}

function pickString(input: unknown, paths: string[]): string | null {
  for (const path of paths) {
    const value = getPathValue(input, path);
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return null;
}

function pickNumber(input: unknown, paths: string[]): number | null {
  for (const path of paths) {
    const value = getPathValue(input, path);
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const cleaned = value.replace(/[$,]/g, "");
      const parsed = Number(cleaned);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function pickBoolean(input: unknown, paths: string[]): boolean {
  for (const path of paths) {
    const value = getPathValue(input, path);
    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "number") {
      return value === 1;
    }

    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (["true", "yes", "y", "1"].includes(normalized)) {
        return true;
      }
    }
  }

  return false;
}

function escapeLuceneToken(value: string): string {
  return value.replace(/[+\-!(){}\[\]^"~*?:\\/]/g, " ").trim();
}

function escapeLucenePhrase(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').trim();
}

function makeEntityId(displayName: string, crd: string | null, cik: string | null): string {
  if (crd) {
    return `crd-${crd}`;
  }

  if (cik) {
    return `cik-${cik}`;
  }

  return `name-${displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

function dedupeEntities(entities: Entity[]): Entity[] {
  const map = new Map<string, Entity>();
  for (const entity of entities) {
    map.set(entity.id, map.get(entity.id) ?? entity);
  }
  return Array.from(map.values());
}

async function runAdvFirmQuery(query: string, size = 8): Promise<GenericSecApiRecord[]> {
  const response = await secApiPost<SecApiEnvelope<GenericSecApiRecord>>("/form-adv/firm", {
    query,
    from: "0",
    size: String(size),
    sort: [{ "Filing.Dt": { order: "desc" } }]
  });

  return response.data ?? [];
}

async function runCoverPageQuery(query: string, size = 8): Promise<ThirteenFCoverPage[]> {
  const response = await secApiPost<SecApiEnvelope<ThirteenFCoverPage>>("/form-13f/cover-pages", {
    query,
    from: "0",
    size: String(size),
    sort: [{ periodOfReport: { order: "desc" } }, { filedAt: { order: "desc" } }]
  });

  return response.data ?? [];
}

function normalizeEntityFromAdvRecord(record: GenericSecApiRecord): Entity {
  const displayName = pickString(record, ["Info.BusNm", "Info.LegalNm"]) ?? "Unknown Manager";
  const crd = pickString(record, ["Info.FirmCrdNb"]);
  const cik = pickString(record, ["Info.CIK", "Info.Cik", "Info.CIKNb"]);
  const legalName = pickString(record, ["Info.LegalNm"]);
  const aum = pickNumber(record, ["FormInfo.Part1A.Item5F.Q5F2C"]);
  const city = pickString(record, ["MainAddr.City", "MailingAddr.City"]);
  const stateOrCountry = pickString(record, ["MainAddr.State", "MainAddr.Cntry", "MailingAddr.State", "MailingAddr.Cntry"]);
  const isExempt = pickBoolean(record, ["Info.ERAInd", "Info.IsERA", "FormInfo.Part1A.Item2.IsERA"]);

  return {
    id: makeEntityId(displayName, crd, cik),
    displayName,
    legalName,
    crd,
    cik,
    secNumber: pickString(record, ["Info.Secnbr", "Info.SECNbr"]),
    adviserType: isExempt ? "Exempt Reporting Adviser" : "Registered Investment Adviser",
    registrationStatus: isExempt ? "Exempt Reporting Adviser" : "Registered Investment Adviser",
    city,
    stateOrCountry,
    assetsUnderManagement: aum,
    latestAdvFilingDate: pickString(record, ["Filing.Dt"]),
    latest13FPeriod: null,
    latest13FFiledAt: null
  };
}

function normalizeEntityFromCoverPage(record: ThirteenFCoverPage): Entity {
  const displayName = record.filingManager?.name?.trim() || "Unknown Manager";
  const crd = record.filingManager?.crdNumber?.trim() || null;
  const cik = record.cik?.trim() || record.filingManager?.cik?.trim() || null;

  return {
    id: makeEntityId(displayName, crd, cik),
    displayName,
    legalName: displayName,
    crd,
    cik,
    secNumber: null,
    adviserType: "Not Disclosed",
    registrationStatus: null,
    city: null,
    stateOrCountry: record.filingManager?.stateOrCountry?.trim() || null,
    assetsUnderManagement: null,
    latestAdvFilingDate: null,
    latest13FPeriod: record.periodOfReport || null,
    latest13FFiledAt: record.filedAt || null
  };
}

export async function searchEntities(query: string): Promise<Entity[]> {
  const cleanedQuery = query.trim();
  if (cleanedQuery.length < 2) {
    return [];
  }

  const isNumeric = /^\d+$/.test(cleanedQuery);
  const exactAdvQuery = isNumeric
    ? [`Info.FirmCrdNb:${cleanedQuery}`, `Info.Secnbr:${cleanedQuery}`].join(" OR ")
    : [`Info.BusNm:\"${escapeLucenePhrase(cleanedQuery)}\"`, `Info.LegalNm:\"${escapeLucenePhrase(cleanedQuery)}\"`].join(" OR ");

  let advMatches = await runAdvFirmQuery(exactAdvQuery);
  if (!advMatches.length && !isNumeric) {
    const tokens = cleanedQuery
      .split(/\s+/)
      .map(escapeLuceneToken)
      .filter(Boolean);

    if (tokens.length) {
      const tokenQuery = tokens.map((token) => `(Info.BusNm:${token} OR Info.LegalNm:${token})`).join(" AND ");
      advMatches = await runAdvFirmQuery(tokenQuery);
    }
  }

  let entities = dedupeEntities(advMatches.map(normalizeEntityFromAdvRecord));

  if (!entities.length) {
    const coverPageQuery = isNumeric
      ? `crdNumber:${cleanedQuery} OR cik:${cleanedQuery}`
      : `filingManager.name:\"${escapeLucenePhrase(cleanedQuery)}\"`;
    const coverPageMatches = await runCoverPageQuery(coverPageQuery);
    entities = dedupeEntities(coverPageMatches.map(normalizeEntityFromCoverPage));
  }

  const entitiesToEnrich = entities.slice(0, 4);
  const enrichment = await Promise.allSettled(
    entitiesToEnrich.map(async (entity) => {
      if (entity.cik || !entity.crd) {
        return entity;
      }

      const latestCoverPage = await fetchLatest13FCoverPage({ crd: entity.crd });
      if (!latestCoverPage) {
        return entity;
      }

      return {
        ...entity,
        cik: entity.cik ?? latestCoverPage.cik ?? null,
        latest13FPeriod: latestCoverPage.periodOfReport,
        latest13FFiledAt: latestCoverPage.filedAt
      };
    })
  );

  const enrichedById = new Map<string, Entity>();
  enrichment.forEach((result) => {
    if (result.status === "fulfilled") {
      enrichedById.set(result.value.id, result.value);
    }
  });

  return entities.map((entity) => enrichedById.get(entity.id) ?? entity).slice(0, 8);
}

export async function fetchLatestAdvRecord(entity: Entity): Promise<GenericSecApiRecord | null> {
  if (entity.crd) {
    const matches = await runAdvFirmQuery(`Info.FirmCrdNb:${entity.crd}`, 1);
    return matches[0] ?? null;
  }

  const exactName = escapeLucenePhrase(entity.displayName);
  const matches = await runAdvFirmQuery(`Info.BusNm:\"${exactName}\" OR Info.LegalNm:\"${exactName}\"`, 1);
  return matches[0] ?? null;
}

export async function fetchLatest13FCoverPage(params: {
  crd?: string | null;
  cik?: string | null;
  name?: string | null;
}): Promise<FilingSnapshot | null> {
  const query = params.crd
    ? `crdNumber:${params.crd}`
    : params.cik
      ? `cik:${params.cik}`
      : params.name
        ? `filingManager.name:\"${escapeLucenePhrase(params.name)}\"`
        : null;

  if (!query) {
    return null;
  }

  const matches = await runCoverPageQuery(query, 1);
  const filing = matches[0];
  if (!filing?.accessionNo) {
    return null;
  }

  return {
    accessionNo: filing.accessionNo,
    managerName: filing.filingManager?.name?.trim() || null,
    cik: filing.cik?.trim() || filing.filingManager?.cik?.trim() || null,
    crd: filing.filingManager?.crdNumber?.trim() || null,
    periodOfReport: filing.periodOfReport || null,
    filedAt: filing.filedAt || null,
    reportType: filing.reportType || null,
    tableEntryTotal: typeof filing.tableEntryTotal === "number" ? filing.tableEntryTotal : Number(filing.tableEntryTotal ?? NaN) || null
  };
}

export async function fetch13FHoldings(accessionNo: string): Promise<ThirteenFHoldingEntry[]> {
  const response = await secApiPost<SecApiEnvelope<ThirteenFHoldingsFiling>>("/form-13f/holdings", {
    query: `accessionNo:\"${escapeLucenePhrase(accessionNo)}\"`,
    from: "0",
    size: "1"
  });

  return response.data?.[0]?.holdings ?? [];
}

function countCollection(value: unknown): number | null {
  if (Array.isArray(value)) {
    return value.length;
  }

  if (isRecord(value) && Array.isArray(value.data)) {
    return value.data.length;
  }

  return null;
}

export async function fetchPrivateFundCount(crd: string): Promise<number | null> {
  try {
    const response = await secApiGet<unknown>(`/form-adv/schedule-d-7-b-1/${encodeURIComponent(crd)}`);
    return countCollection(response);
  } catch {
    return null;
  }
}

export async function fetchRelatedPersonCount(crd: string): Promise<number | null> {
  try {
    const response = await secApiGet<unknown>(`/form-adv/schedule-d-7-a/${encodeURIComponent(crd)}`);
    return countCollection(response);
  } catch {
    return null;
  }
}

export function normalizeAdvData(record: GenericSecApiRecord | null, entity: Entity, extras?: {
  privateFundCount?: number | null;
  relatedPersonCount?: number | null;
}): ADVData | null {
  if (!record) {
    return entity.crd || entity.cik
      ? {
          businessName: entity.displayName,
          legalName: entity.legalName,
          crd: entity.crd,
          cik: entity.cik,
          secNumber: entity.secNumber,
          filingDate: entity.latestAdvFilingDate,
          officeLocation: [entity.city, entity.stateOrCountry].filter(Boolean).join(", ") || null,
          aumUsd: entity.assetsUnderManagement,
          privateFundCount: extras?.privateFundCount ?? null,
          relatedPersonCount: extras?.relatedPersonCount ?? null,
          isExemptReportingAdviser: entity.adviserType === "Exempt Reporting Adviser",
          registrationStatus: entity.registrationStatus ?? entity.adviserType,
          narrativeFields: {
            assetsUnderManagement: entity.assetsUnderManagement != null ? formatCurrency(entity.assetsUnderManagement) : null,
            officeLocation: [entity.city, entity.stateOrCountry].filter(Boolean).join(", ") || null,
            privateFundCount: extras?.privateFundCount != null ? String(extras.privateFundCount) : null,
            relatedPersonCount: extras?.relatedPersonCount != null ? String(extras.relatedPersonCount) : null
          }
        }
      : null;
  }

  const officeLocation = [
    pickString(record, ["MainAddr.City", "MailingAddr.City"]),
    pickString(record, ["MainAddr.State", "MailingAddr.State"]),
    pickString(record, ["MainAddr.Cntry", "MailingAddr.Cntry"])
  ]
    .filter(Boolean)
    .join(", ") || null;

  const aumUsd = pickNumber(record, ["FormInfo.Part1A.Item5F.Q5F2C"]) ?? entity.assetsUnderManagement;
  const isExempt = pickBoolean(record, ["Info.ERAInd", "Info.IsERA", "FormInfo.Part1A.Item2.IsERA"])
    || entity.adviserType === "Exempt Reporting Adviser";
  const registrationStatus = isExempt ? "Exempt Reporting Adviser" : "Registered Investment Adviser";

  return {
    businessName: pickString(record, ["Info.BusNm", "Info.LegalNm"]) ?? entity.displayName,
    legalName: pickString(record, ["Info.LegalNm"]) ?? entity.legalName,
    crd: pickString(record, ["Info.FirmCrdNb"]) ?? entity.crd,
    cik: pickString(record, ["Info.CIK", "Info.Cik", "Info.CIKNb"]) ?? entity.cik,
    secNumber: pickString(record, ["Info.Secnbr", "Info.SECNbr"]) ?? entity.secNumber,
    filingDate: pickString(record, ["Filing.Dt"]) ?? entity.latestAdvFilingDate,
    officeLocation,
    aumUsd,
    privateFundCount: extras?.privateFundCount ?? null,
    relatedPersonCount: extras?.relatedPersonCount ?? null,
    isExemptReportingAdviser: isExempt,
    registrationStatus,
    narrativeFields: {
      assetsUnderManagement: aumUsd != null ? formatCurrency(aumUsd) : null,
      officeLocation,
      privateFundCount: extras?.privateFundCount != null ? String(extras.privateFundCount) : null,
      relatedPersonCount: extras?.relatedPersonCount != null ? String(extras.relatedPersonCount) : null
    }
  };
}

export function aggregateHoldings(holdings: ThirteenFHoldingEntry[]): {
  holdings: Holding[];
  totalPortfolioValue: number;
  totalPortfolioValueDisplay: string;
} {
  const grouped = new Map<string, Holding>();

  let totalPortfolioValue = 0;

  holdings.forEach((holding, index) => {
    const totalValue = pickNumber(holding, ["value"]) ?? 0;
    totalPortfolioValue += totalValue;

    const ticker = pickString(holding, ["ticker", "cusip"]) ?? `unknown-${index + 1}`;
    const issuerName = pickString(holding, ["nameOfIssuer", "issuerName"]) ?? "Not Disclosed";
    const shareCount = pickNumber(holding, ["shrsOrPrnAmt.sshPrnamt"]);
    const existing = grouped.get(ticker);

    if (existing) {
      existing.totalValue += totalValue;
      existing.positionCount += 1;
      existing.shareCount = (existing.shareCount ?? 0) + (shareCount ?? 0);
      if (existing.issuerName === "Not Disclosed" && issuerName !== "Not Disclosed") {
        existing.issuerName = issuerName;
      }
      return;
    }

    grouped.set(ticker, {
      ticker,
      issuerName,
      issuerCik: pickString(holding, ["cik"]),
      cusip: pickString(holding, ["cusip"]),
      totalValue,
      shareCount,
      positionCount: 1,
      percentageOfPortfolio: null
    });
  });

  const ranked = Array.from(grouped.values())
    .sort((left, right) => right.totalValue - left.totalValue)
    .slice(0, 25)
    .map((holding) => ({
      ...holding,
      percentageOfPortfolio: totalPortfolioValue > 0 ? (holding.totalValue / totalPortfolioValue) * 100 : null
    }));

  return {
    holdings: ranked,
    totalPortfolioValue,
    totalPortfolioValueDisplay: formatCurrency(totalPortfolioValue)
  };
}

export function mergeEntity(base: Entity, additions: Partial<Entity>): Entity {
  return {
    ...base,
    ...additions,
    displayName: additions.displayName ?? base.displayName,
    legalName: additions.legalName ?? base.legalName,
    crd: additions.crd ?? base.crd,
    cik: additions.cik ?? base.cik,
    secNumber: additions.secNumber ?? base.secNumber,
    adviserType: additions.adviserType ?? base.adviserType,
    registrationStatus: additions.registrationStatus ?? base.registrationStatus,
    city: additions.city ?? base.city,
    stateOrCountry: additions.stateOrCountry ?? base.stateOrCountry,
    assetsUnderManagement: additions.assetsUnderManagement ?? base.assetsUnderManagement,
    latestAdvFilingDate: additions.latestAdvFilingDate ?? base.latestAdvFilingDate,
    latest13FPeriod: additions.latest13FPeriod ?? base.latest13FPeriod,
    latest13FFiledAt: additions.latest13FFiledAt ?? base.latest13FFiledAt,
    id: makeEntityId(additions.displayName ?? base.displayName, additions.crd ?? base.crd, additions.cik ?? base.cik)
  };
}

export function buildSecLink(cik: string | null): string | null {
  return cik ? `https://www.sec.gov/edgar/browse/?CIK=${encodeURIComponent(cik)}` : null;
}

export function buildIapdLink(crd: string | null): string | null {
  return crd ? `https://adviserinfo.sec.gov/firm/summary/${encodeURIComponent(crd)}` : null;
}

