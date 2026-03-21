export interface FormAdvLinks {
  summary: string;
  advPdf: string;
  crsPdf: string;
}

export interface StarterFormAdvFirm {
  name: string;
  crd: string;
  secFile?: string;
  aliases?: string[];
  headquarters?: string;
  phone?: string;
  registrationSnapshot: string;
  serviceSnapshot?: string;
  feeSnapshot?: string;
  brochureAudiences?: string[];
  stateRegistrations?: string[];
  focusTags?: string[];
  nextRead?: string;
  notes: string[];
  sourceCoverage: string[];
  links: FormAdvLinks;
}

export function buildFormAdvLinks(crd: string): FormAdvLinks {
  return {
    summary: `https://adviserinfo.sec.gov/firm/summary/${crd}`,
    advPdf: `https://reports.adviserinfo.sec.gov/reports/ADV/${crd}/PDF/${crd}.pdf`,
    crsPdf: `https://reports.adviserinfo.sec.gov/crs/crs_${crd}.pdf`
  };
}

export const starterFormAdvFirms: StarterFormAdvFirm[] = [
  {
    name: 'Gamma Asset Management LLC',
    crd: '300050',
    secFile: '801-129754',
    headquarters: 'San Juan, Puerto Rico',
    phone: '787-957-3260',
    registrationSnapshot: 'SEC-registered adviser with a current ADV amendment dated March 14, 2025.',
    serviceSnapshot:
      'Advisory services include asset and portfolio management, research, and financial advice for individuals, high net worth clients, corporations, institutions, and other entities.',
    focusTags: ['SEC-registered', 'portfolio management', 'institutional reach'],
    nextRead: 'Open the ADV PDF first for identity, office, and filing status, then use CRS to understand the client-facing service split.',
    notes: [
      'The ADV PDF exposes clean Item 1 identity data: SEC file number, office address, hours, and phone.',
      'The Form CRS lays out the split between brokerage and advisory services, which is useful when you are triaging dual-platform firms.'
    ],
    sourceCoverage: ['ADV Part 1', 'Form CRS'],
    links: buildFormAdvLinks('300050')
  },
  {
    name: 'Equity Advisors, LLC',
    crd: '300031',
    aliases: ['Shockwave Advisors', 'Lifelong Retirement Corp'],
    headquarters: 'Zephyr Cove, Nevada',
    registrationSnapshot:
      'Summary page shows approved registrations across Alabama, California, Florida, Missouri, Nevada, New Jersey, North Carolina, and Pennsylvania.',
    stateRegistrations: ['Alabama', 'California', 'Florida', 'Missouri', 'Nevada', 'New Jersey', 'North Carolina', 'Pennsylvania'],
    focusTags: ['multi-state footprint', 'alias resolution'],
    nextRead: 'Start with the summary page to validate the business names and state registrations before opening the ADV PDF.',
    notes: [
      'This is a good example of why a fast state-footprint view matters before you even open the ADV PDF.',
      'The summary page also surfaces alternate business names immediately, which helps when firms show up differently across decks, filings, and CRM records.'
    ],
    sourceCoverage: ['Firm summary'],
    links: buildFormAdvLinks('300031')
  },
  {
    name: 'Earth Equity Advisors, LLC',
    crd: '285554',
    registrationSnapshot: 'Retail-focused adviser with a Form CRS that cleanly separates service channels and fee schedules.',
    serviceSnapshot:
      'Offers portfolio management and financial planning to retail clients through an online channel and a dedicated-advisor channel focused on responsible investing.',
    feeSnapshot:
      'Form CRS shows a 0.75% annual fee for ALIGN DIGITAL accounts and a tiered fee up to 1.25% for dedicated advisory accounts, plus custodial costs.',
    focusTags: ['retail', 'financial planning', 'fee clarity'],
    nextRead: 'Open the CRS first because the service channels and fee schedule are already laid out clearly there.',
    notes: [
      'This is exactly the kind of fee detail users want without digging through multiple PDFs.',
      'Quarterly monitoring and the difference between digital and advisor-led service are both easy to pull into a compare view.'
    ],
    sourceCoverage: ['Form CRS'],
    links: buildFormAdvLinks('285554')
  },
  {
    name: 'Hand Capital Management',
    crd: '309893',
    registrationSnapshot: 'ADV Part 2 brochure references are visible directly inside the official ADV PDF.',
    brochureAudiences: ['Individuals', 'Foundations/charities', 'Private funds or pools'],
    focusTags: ['brochure check', 'private funds'],
    nextRead: 'Open the ADV PDF and go straight to the brochure table to understand who the documents were written for.',
    notes: [
      'The brochure table is useful for spotting who the adviser says the documents are written for.',
      'Starter coverage here is brochure-oriented rather than fee-oriented, which is still helpful during early diligence.'
    ],
    sourceCoverage: ['ADV Part 2 brochure table'],
    links: buildFormAdvLinks('309893')
  },
  {
    name: 'Eightsky Mountains Capital Management, LLC',
    crd: '155243',
    aliases: ['Eightsky Mountains (ESMCM)'],
    headquarters: 'Seattle, Washington',
    phone: '206-420-6624',
    registrationSnapshot: 'ADV Part 1 gives a clean Seattle office record with current contact information and business hours.',
    focusTags: ['office context', 'identity check'],
    nextRead: 'Use the ADV PDF first to verify the operating office, contact info, and naming before going deeper.',
    notes: [
      'This is a good example of how much operational context is buried in the raw filing even before you get to strategy and fees.',
      'The official filing also makes it easy to spot whether the firm is using a different public-facing business name.'
    ],
    sourceCoverage: ['ADV Part 1'],
    links: buildFormAdvLinks('155243')
  },
  {
    name: 'Signal Partners, LLC',
    crd: '269916',
    phone: '206-669-8961',
    registrationSnapshot: 'ADV Part 1 shows a by-appointment operating model and confirms one additional office beyond the principal place of business.',
    focusTags: ['office count', 'operating footprint'],
    nextRead: 'Open the ADV PDF to validate office footprint and how substantial the platform looks operationally.',
    notes: [
      'The office count is one of those details that can matter quickly when you are trying to understand how substantial the platform really is.',
      'This is also a reminder that a useful tool should surface the basics before making anyone read the entire PDF.'
    ],
    sourceCoverage: ['ADV Part 1'],
    links: buildFormAdvLinks('269916')
  }
];
