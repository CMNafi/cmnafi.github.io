/**
 * Form ADV snapshot for the /claude FormAdvMiniExplorer island.
 *
 * Every per-firm figure below was read from that adviser's Form ADV Part 1A as published by the
 * SEC's Investment Adviser Public Disclosure site (IAPD), fetched on 2026-10-14:
 *   https://reports.adviserinfo.sec.gov/reports/ADV/<CRD>/PDF/<CRD>.pdf
 * CRD numbers and SEC file numbers were confirmed against the IAPD firm search API
 * (https://api.adviserinfo.sec.gov/search/firm?query=...) the same day.
 *
 * Items used:
 *   1.A / 1.B  legal and primary business name
 *   1.F        principal office (city, state)
 *   5.A        employees (approximate, as filed)
 *   5.C(2)     share of clients that are non-U.S. persons
 *   5.D(3)     regulatory assets under management (RAUM) by client type
 *   5.F(2)     discretionary / non-discretionary RAUM and number of accounts
 *   5.F(3)     RAUM attributable to non-U.S. persons
 *
 * Not captured: Item 5.E (compensation arrangements) is a check-box grid whose marks are not
 * present in the PDF text layer, so fee structures are deliberately left out rather than guessed.
 *
 * Each record is ONE registered adviser entity. Large managers (BlackRock, Blackstone, Apollo,
 * CVC) register several advisers with the SEC, so these are not firm-wide totals.
 * RAUM is calculated gross (Form ADV Part 1A Instruction 5.b says not to deduct outstanding
 * indebtedness), so leveraged funds can report RAUM well above their commonly quoted net AUM.
 */

export type ClientTypeKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n';

/** Form ADV Part 1A Item 5.D client categories, shortened for display. */
export const CLIENT_TYPE_LABELS: Record<ClientTypeKey, string> = {
  a: 'Individuals',
  b: 'High net worth individuals',
  c: 'Banking or thrift institutions',
  d: 'Investment companies',
  e: 'Business development companies',
  f: 'Pooled investment vehicles',
  g: 'Pension and profit sharing plans',
  h: 'Charitable organizations',
  i: 'State or municipal government entities',
  j: 'Other investment advisers',
  k: 'Insurance companies',
  l: 'Sovereign wealth funds and foreign official institutions',
  m: 'Corporations or other businesses',
  n: 'Other'
};

export interface AdviserClientType {
  key: ClientTypeKey;
  /** RAUM attributed to this client type in Item 5.D(3), USD */
  raum: number;
  /** Free-text label the filer used for category (n) "Other" */
  otherLabel?: string;
}

export interface AdviserSnapshot {
  id: string;
  /** Short label for pills, e.g. "BlackRock" */
  shortName: string;
  /** Name shown on the card (primary business name from Item 1.B) */
  displayName: string;
  /** Full legal name from Item 1.A */
  legalName: string;
  crd: string;
  secFileNumber: string;
  headquarters: string;
  filing: {
    kind: 'Annual amendment' | 'Other-than-annual amendment';
    /** Date stamped on the filing, YYYY-MM-DD */
    date: string;
  };
  employees: number;
  nonUsClientPct: number;
  raum: {
    discretionary: number;
    nonDiscretionary: number;
    total: number;
  };
  accounts: {
    discretionary: number;
    nonDiscretionary: number;
    total: number;
  };
  nonUsRaum: number;
  clientTypes: AdviserClientType[];
  /** Item 5.E is not captured in this snapshot (see header comment). */
  compensation: null;
  searchTerms: string[];
  note?: string;
  related?: { href: string; label: string };
  links: { summary: string; pdf: string };
}

export const ADV_SNAPSHOT_FETCHED = '2026-10-14';

const iapd = (crd: string) => ({
  summary: `https://adviserinfo.sec.gov/firm/summary/${crd}`,
  pdf: `https://reports.adviserinfo.sec.gov/reports/ADV/${crd}/PDF/${crd}.pdf`
});

export const sampleAdvisers: AdviserSnapshot[] = [
  {
    id: 'blackrock',
    shortName: 'BlackRock',
    displayName: 'BlackRock Fund Advisors',
    legalName: 'BlackRock Fund Advisors',
    crd: '105247',
    secFileNumber: '801-22609',
    headquarters: 'San Francisco, California',
    filing: { kind: 'Other-than-annual amendment', date: '2026-10-02' },
    employees: 128,
    nonUsClientPct: 0,
    raum: { discretionary: 4_282_224_366_957, nonDiscretionary: 0, total: 4_282_224_366_957 },
    accounts: { discretionary: 556, nonDiscretionary: 0, total: 556 },
    nonUsRaum: 2_133_210_763,
    clientTypes: [
      { key: 'd', raum: 4_277_634_633_004 },
      { key: 'f', raum: 3_214_883_658 },
      { key: 'i', raum: 1_374_850_295 }
    ],
    compensation: null,
    searchTerms: ['blackrock', 'bfa', 'ishares', 'blackrock fund advisors'],
    note:
      'One of several BlackRock advisers; BlackRock Financial Management, Inc. (CRD 107105) files separately. The Universe of Form ADV lists this entity at $3.05 trillion from an earlier bulk snapshot; this card uses the October 2, 2026 filing.',
    related: { href: '/field-notes/blackstone-vs-blackrock', label: 'I Applied to Blackstone. I Interviewed at BlackRock.' },
    links: iapd('105247')
  },
  {
    id: 'blackstone',
    shortName: 'Blackstone',
    displayName: 'Blackstone Management Partners',
    legalName: 'Blackstone Management Partners L.L.C.',
    crd: '136979',
    secFileNumber: '801-64755',
    headquarters: 'New York, New York',
    filing: { kind: 'Annual amendment', date: '2026-03-30' },
    employees: 213,
    nonUsClientPct: 42,
    raum: { discretionary: 145_730_683_863, nonDiscretionary: 0, total: 145_730_683_863 },
    accounts: { discretionary: 36, nonDiscretionary: 0, total: 36 },
    nonUsRaum: 31_529_764_650,
    clientTypes: [{ key: 'f', raum: 145_730_683_863 }],
    compensation: null,
    searchTerms: ['blackstone', 'bx', 'blackstone management partners', 'private equity'],
    note:
      'Blackstone registers dozens of advisers with the SEC (real estate, credit, hedge fund solutions and more). This card is one of them, not the whole firm.',
    related: { href: '/field-notes/blackstone-vs-blackrock', label: 'I Applied to Blackstone. I Interviewed at BlackRock.' },
    links: iapd('136979')
  },
  {
    id: 'apollo',
    shortName: 'Apollo',
    displayName: 'Apollo Capital Management',
    legalName: 'Apollo Capital Management, L.P.',
    crd: '143161',
    secFileNumber: '801-67592',
    headquarters: 'New York, New York',
    filing: { kind: 'Other-than-annual amendment', date: '2026-10-01' },
    employees: 3564,
    nonUsClientPct: 43,
    raum: { discretionary: 702_929_390_946, nonDiscretionary: 15_547_346_374, total: 718_476_737_320 },
    accounts: { discretionary: 784, nonDiscretionary: 19, total: 803 },
    nonUsRaum: 145_917_550_151,
    clientTypes: [
      { key: 'k', raum: 417_433_736_776 },
      { key: 'f', raum: 285_172_790_313 },
      { key: 'd', raum: 9_912_415_195 },
      { key: 'j', raum: 2_008_895_962 },
      { key: 'n', raum: 1_679_502_242, otherLabel: 'Other financial institution' },
      { key: 'g', raum: 1_491_968_809 },
      { key: 'l', raum: 522_924_734 },
      { key: 'c', raum: 254_503_289 }
    ],
    compensation: null,
    searchTerms: ['apollo', 'apollo global management', 'apo', 'athene', 'credit'],
    note: 'Insurance companies are the largest client type in this filing, ahead of pooled investment vehicles.',
    related: { href: '/field-notes/apollo-global-management-sports', label: 'Apollo Global Management: From Junk Bonds to the Beautiful Game' },
    links: iapd('143161')
  },
  {
    id: 'a16z',
    shortName: 'a16z',
    displayName: 'Andreessen Horowitz',
    legalName: 'A16Z Capital Management, L.L.C.',
    crd: '160489',
    secFileNumber: '801-114985',
    headquarters: 'Menlo Park, California',
    filing: { kind: 'Annual amendment', date: '2026-03-30' },
    employees: 738,
    nonUsClientPct: 0,
    raum: { discretionary: 106_476_153_956, nonDiscretionary: 0, total: 106_476_153_956 },
    accounts: { discretionary: 119, nonDiscretionary: 0, total: 119 },
    nonUsRaum: 0,
    clientTypes: [{ key: 'f', raum: 106_476_153_956 }],
    compensation: null,
    searchTerms: ['a16z', 'andreessen', 'horowitz', 'venture capital', 'vc'],
    related: { href: '/field-notes/andreessen-horowitz', label: 'Andreessen Horowitz: The Firm That Rewrote the VC Rulebook' },
    links: iapd('160489')
  },
  {
    id: 'skybridge',
    shortName: 'SkyBridge',
    displayName: 'SkyBridge Capital II',
    legalName: 'SkyBridge Capital II, LLC',
    crd: '148152',
    secFileNumber: '801-71056',
    headquarters: 'New York, New York',
    filing: { kind: 'Annual amendment', date: '2026-03-31' },
    employees: 24,
    nonUsClientPct: 28,
    raum: { discretionary: 1_919_531_000, nonDiscretionary: 0, total: 1_919_531_000 },
    accounts: { discretionary: 18, nonDiscretionary: 0, total: 18 },
    nonUsRaum: 395_360_000,
    clientTypes: [
      { key: 'd', raum: 1_423_896_000 },
      { key: 'f', raum: 495_635_000 }
    ],
    compensation: null,
    searchTerms: ['skybridge', 'sky bridge', 'fund of funds', 'hedge fund'],
    note: 'Most of this RAUM sits in registered investment companies rather than private funds.',
    links: iapd('148152')
  },
  {
    id: 'citadel',
    shortName: 'Citadel',
    displayName: 'Citadel Advisors',
    legalName: 'Citadel Advisors LLC',
    crd: '148826',
    secFileNumber: '801-70860',
    headquarters: 'Miami, Florida',
    filing: { kind: 'Other-than-annual amendment', date: '2026-06-11' },
    employees: 3284,
    nonUsClientPct: 62,
    raum: { discretionary: 570_621_709_022, nonDiscretionary: 0, total: 570_621_709_022 },
    accounts: { discretionary: 37, nonDiscretionary: 0, total: 37 },
    nonUsRaum: 384_834_614_984,
    clientTypes: [{ key: 'f', raum: 570_621_709_022 }],
    compensation: null,
    searchTerms: ['citadel', 'citadel advisors', 'hedge fund', 'multi-strategy'],
    note: 'Regulatory AUM is gross: borrowings are not deducted, so a leveraged fund can report far more than the net assets usually quoted.',
    links: iapd('148826')
  },
  {
    id: 'bridgewater',
    shortName: 'Bridgewater',
    displayName: 'Bridgewater Associates',
    legalName: 'Bridgewater Associates, LP',
    crd: '105129',
    secFileNumber: '801-35875',
    headquarters: 'Westport, Connecticut',
    filing: { kind: 'Other-than-annual amendment', date: '2026-08-18' },
    employees: 1135,
    nonUsClientPct: 71,
    raum: { discretionary: 150_159_985_476, nonDiscretionary: 0, total: 150_159_985_476 },
    accounts: { discretionary: 133, nonDiscretionary: 0, total: 133 },
    nonUsRaum: 104_859_105_940,
    clientTypes: [
      { key: 'f', raum: 114_726_390_587 },
      { key: 'n', raum: 12_603_996_043, otherLabel: 'Advisory clients not captured in the above categories' },
      { key: 'l', raum: 8_851_824_386 },
      { key: 'i', raum: 7_963_376_064 },
      { key: 'g', raum: 5_319_372_308 },
      { key: 'h', raum: 683_365_424 },
      { key: 'c', raum: 11_660_664 }
    ],
    compensation: null,
    searchTerms: ['bridgewater', 'macro', 'all weather', 'pure alpha', 'hedge fund'],
    note: 'Pensions, sovereign wealth funds and state entities sit alongside pooled vehicles in this filing.',
    links: iapd('105129')
  },
  {
    id: 'cvc',
    shortName: 'CVC',
    displayName: 'CVC Advisors (U.S.)',
    legalName: 'CVC Advisors (U.S.) Inc.',
    crd: '174050',
    secFileNumber: '801-100495',
    headquarters: 'New York, New York',
    filing: { kind: 'Other-than-annual amendment', date: '2026-09-14' },
    employees: 70,
    nonUsClientPct: 100,
    raum: { discretionary: 0, nonDiscretionary: 25_560_740_629, total: 25_560_740_629 },
    accounts: { discretionary: 0, nonDiscretionary: 20, total: 20 },
    nonUsRaum: 25_560_740_629,
    clientTypes: [{ key: 'f', raum: 25_560_740_629 }],
    compensation: null,
    searchTerms: ['cvc', 'cvc capital partners', 'private equity', 'europe'],
    note: 'Every dollar here is reported as non-discretionary, and every client is a non-U.S. person.',
    related: { href: '/field-notes/cvc-capital-sports', label: 'The Original Sports PE Firm: CVC Capital Partners' },
    links: iapd('174050')
  }
];

/** Default comparison: a nod to the Blackstone/BlackRock mix-up. */
export const DEFAULT_ADVISER_ID = 'blackrock';
export const DEFAULT_COMPARE_ID = 'blackstone';

/** Industry-level context, from the Field Note "The Universe of Form ADV" (data as of June 2026). */
export const ADV_UNIVERSE = {
  advisers: 56_107,
  secRegistered: 37_751,
  exemptReporting: 18_356,
  totalRaumLabel: '$163.2T',
  form13fFilers: 6_215,
  asOf: 'June 2026',
  href: '/field-notes/adv-universe'
} as const;
