export type AdviserType = "Registered Investment Adviser" | "Exempt Reporting Adviser" | "Not Disclosed";

export interface Entity {
  id: string;
  displayName: string;
  legalName: string | null;
  crd: string | null;
  cik: string | null;
  secNumber: string | null;
  adviserType: AdviserType;
  registrationStatus: string | null;
  city: string | null;
  stateOrCountry: string | null;
  assetsUnderManagement: number | null;
  latestAdvFilingDate: string | null;
  latest13FPeriod: string | null;
  latest13FFiledAt: string | null;
}

export interface Holding {
  ticker: string;
  issuerName: string;
  issuerCik: string | null;
  cusip: string | null;
  totalValue: number;
  shareCount: number | null;
  positionCount: number;
  percentageOfPortfolio: number | null;
}

export interface ADVData {
  businessName: string;
  legalName: string | null;
  crd: string | null;
  cik: string | null;
  secNumber: string | null;
  filingDate: string | null;
  officeLocation: string | null;
  aumUsd: number | null;
  privateFundCount: number | null;
  relatedPersonCount: number | null;
  isExemptReportingAdviser: boolean;
  registrationStatus: string;
  narrativeFields: Record<string, string | null>;
}

export interface DeepLinks {
  sec: string | null;
  iapd: string | null;
}

export interface FilingSnapshot {
  accessionNo: string;
  managerName: string | null;
  cik: string | null;
  crd: string | null;
  periodOfReport: string | null;
  filedAt: string | null;
  reportType: string | null;
  tableEntryTotal: number | null;
}

export interface SummaryOptions {
  includeAdvProfile: boolean;
  includeHoldings: boolean;
  includeOperationalContext: boolean;
  includeNarrative: boolean;
}

export interface SearchEntityResponse {
  results: Entity[];
}

export interface GenerateSummaryRequest {
  entity: Entity;
  options: SummaryOptions;
}

export interface ManagerSummaryResponse {
  entity: Entity;
  deepLinks: DeepLinks;
  advData: ADVData | null;
  filing: FilingSnapshot | null;
  holdings: Holding[];
  totalPortfolioValue: number;
  totalPortfolioValueDisplay: string;
  narrativeSummary: string | null;
  warnings: string[];
  options: SummaryOptions;
}

export interface SecApiEnvelope<T> {
  data: T[];
  total?: {
    value: number;
    relation: string;
  };
}

export type GenericSecApiRecord = Record<string, unknown>;

export interface ThirteenFCoverPage {
  accessionNo?: string;
  cik?: string | null;
  filedAt?: string | null;
  periodOfReport?: string | null;
  reportType?: string | null;
  tableEntryTotal?: number | string | null;
  filingManager?: {
    name?: string | null;
    cik?: string | null;
    crdNumber?: string | null;
    stateOrCountry?: string | null;
  };
}

export interface ThirteenFHoldingEntry {
  ticker?: string | null;
  cusip?: string | null;
  cik?: string | null;
  value?: number | string | null;
  nameOfIssuer?: string | null;
  issuerName?: string | null;
  shrsOrPrnAmt?: {
    sshPrnamt?: number | string | null;
  } | null;
}

export interface ThirteenFHoldingsFiling {
  accessionNo?: string;
  filedAt?: string | null;
  periodOfReport?: string | null;
  holdings?: ThirteenFHoldingEntry[];
}

