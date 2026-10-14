export interface AdviserRecord {
  id: string;
  name: string;
  legalEntity: string;
  crd: string;
  secNumber: string;
  primaryLocation: string;
  regulatoryAum: number; // in USD
  aumFormatted: string;
  discretionaryAum: number;
  nonDiscretionaryAum: number;
  discretionaryPct: number;
  clientTypes: { type: string; pct: number }[];
  feeTypes: string[];
  primaryStrategy: string;
  sourceUrl: string;
  filingDate: string;
  notes: string;
}

export const sampleAdvisers: AdviserRecord[] = [
  {
    id: 'blackrock',
    name: 'BlackRock',
    legalEntity: 'BlackRock Advisors, LLC',
    crd: '106614',
    secNumber: '801-47710',
    primaryLocation: 'New York, NY',
    regulatoryAum: 10472000000000,
    aumFormatted: '$10.47 Trillion',
    discretionaryAum: 9634000000000,
    nonDiscretionaryAum: 838000000000,
    discretionaryPct: 92,
    clientTypes: [
      { type: 'Pension & Profit Sharing', pct: 38 },
      { type: 'Pooled Investment Vehicles (ETFs/Mutual Funds)', pct: 34 },
      { type: 'Sovereign Wealth & Central Banks', pct: 16 },
      { type: 'Corporations & Endowments', pct: 12 }
    ],
    feeTypes: ['Percentage of AUM (bps tiered)', 'Performance-based fees (select hedge/alpha strategies)'],
    primaryStrategy: 'Global systematic & index equities, fixed income, Aladdin risk infrastructure, multi-asset portfolios',
    sourceUrl: 'https://reports.adviserinfo.sec.gov/reports/ADV/106614/PDF/106614.pdf',
    filingDate: '2026-03-31',
    notes: 'The world’s largest asset manager. Focus of Nafi’s essay "I Applied to Blackstone. I Interviewed at BlackRock."'
  },
  {
    id: 'blackstone',
    name: 'Blackstone',
    legalEntity: 'Blackstone Alternative Credit Advisors LP',
    crd: '144537',
    secNumber: '801-68254',
    primaryLocation: 'New York, NY',
    regulatoryAum: 1100000000000,
    aumFormatted: '$1.10 Trillion',
    discretionaryAum: 1056000000000,
    nonDiscretionaryAum: 44000000000,
    discretionaryPct: 96,
    clientTypes: [
      { type: 'Pooled Investment Vehicles (PE/Credit/Real Estate)', pct: 68 },
      { type: 'High-Net-Worth Individuals & Family Offices', pct: 18 },
      { type: 'State & Municipal Pension Plans', pct: 14 }
    ],
    feeTypes: ['Management fee (1.0%–1.75% of invested capital)', 'Performance fee / Carried interest (15%–20% over hurdle)'],
    primaryStrategy: 'Private equity buyouts, opportunistic real estate (BREIT), direct private lending (BCRED), infrastructure',
    sourceUrl: 'https://adviserinfo.sec.gov/firm/summary/144537',
    filingDate: '2026-03-27',
    notes: 'Private equity pioneer with massive perpetual capital vehicles targeting wealth channels.'
  },
  {
    id: 'apollo',
    name: 'Apollo Global Management',
    legalEntity: 'Apollo Asset Management Europe & US Advisors',
    crd: '144349',
    secNumber: '801-67852',
    primaryLocation: 'New York, NY',
    regulatoryAum: 733000000000,
    aumFormatted: '$733 Billion',
    discretionaryAum: 689000000000,
    nonDiscretionaryAum: 44000000000,
    discretionaryPct: 94,
    clientTypes: [
      { type: 'Insurance Company Accounts (Athene Retirement)', pct: 54 },
      { type: 'Pooled Investment Vehicles', pct: 31 },
      { type: 'Sovereign Wealth Funds & Pensions', pct: 15 }
    ],
    feeTypes: ['Asset-based advisory fees', 'Sub-advisory insurance spread fees', 'Carried interest / Incentive allocation'],
    primaryStrategy: 'High-grade credit origination, alternative yield, private equity distress-for-control, hybrid capital',
    sourceUrl: 'https://adviserinfo.sec.gov/firm/summary/144349',
    filingDate: '2026-03-30',
    notes: 'Credit and retirement juggernaut anchored by Athene insurance assets.'
  },
  {
    id: 'a16z',
    name: 'Andreessen Horowitz (a16z)',
    legalEntity: 'AH Capital Management, L.L.C.',
    crd: '164627',
    secNumber: '801-76918',
    primaryLocation: 'Menlo Park, CA',
    regulatoryAum: 45800000000,
    aumFormatted: '$45.8 Billion',
    discretionaryAum: 45800000000,
    nonDiscretionaryAum: 0,
    discretionaryPct: 100,
    clientTypes: [
      { type: 'Venture Capital & Growth Private Funds', pct: 92 },
      { type: 'Crypto / Web3 Frontier Vehicles', pct: 8 }
    ],
    feeTypes: ['Management fee (approx. 2.0% - 2.5% of committed capital)', 'Carried interest (20% - 30% performance allocation)'],
    primaryStrategy: 'Venture capital across seed to growth, enterprise software, AI foundation models, biotech, crypto',
    sourceUrl: 'https://adviserinfo.sec.gov/firm/summary/164627',
    filingDate: '2026-03-29',
    notes: 'Registered as an exempt/registered investment adviser to freely allocate to crypto and secondary shares.'
  },
  {
    id: 'skybridge',
    name: 'SkyBridge Capital',
    legalEntity: 'SkyBridge Capital II LLC',
    crd: '148152',
    secNumber: '801-69708',
    primaryLocation: 'New York, NY',
    regulatoryAum: 2100000000,
    aumFormatted: '$2.10 Billion',
    discretionaryAum: 1890000000,
    nonDiscretionaryAum: 210000000,
    discretionaryPct: 90,
    clientTypes: [
      { type: 'High-Net-Worth Individuals & Family Offices', pct: 58 },
      { type: 'Fund of Funds & Pooled Vehicles', pct: 32 },
      { type: 'Institutional & Other', pct: 10 }
    ],
    feeTypes: ['Fixed management fee (1.50% of NAV)', 'Incentive allocations on multi-manager portfolios'],
    primaryStrategy: 'Fund of hedge funds, multi-manager absolute return, digital asset and fintech thematic strategies',
    sourceUrl: 'https://www.skybridge.com/disclosures',
    filingDate: '2026-03-15',
    notes: 'Founded by Anthony Scaramucci; site of Nafi’s Summer 2021 internship reading Good to Great.'
  },
  {
    id: 'citadel',
    name: 'Citadel Advisors',
    legalEntity: 'Citadel Advisors LLC',
    crd: '148826',
    secNumber: '801-69974',
    primaryLocation: 'Miami, FL',
    regulatoryAum: 63000000000,
    aumFormatted: '$63.0 Billion',
    discretionaryAum: 63000000000,
    nonDiscretionaryAum: 0,
    discretionaryPct: 100,
    clientTypes: [
      { type: 'Flagship Multi-Strategy Hedge Funds (Wellington, Kensington)', pct: 100 }
    ],
    feeTypes: ['Pass-through operating expenses & talent compensation', '20%+ performance incentive fees'],
    primaryStrategy: 'Multi-manager relative value across Commodities, Equities, Fixed Income, Quantitative, and Credit',
    sourceUrl: 'https://adviserinfo.sec.gov/Firm/148826',
    filingDate: '2026-03-25',
    notes: 'Ken Griffin’s flagship multi-strategy hedge fund, recognized for industry-leading Sharpe ratios.'
  },
  {
    id: 'bridgewater',
    name: 'Bridgewater Associates',
    legalEntity: 'Bridgewater Associates, LP',
    crd: '104518',
    secNumber: '801-3796',
    primaryLocation: 'Westport, CT',
    regulatoryAum: 97200000000,
    aumFormatted: '$97.2 Billion',
    discretionaryAum: 95256000000,
    nonDiscretionaryAum: 1944000000,
    discretionaryPct: 98,
    clientTypes: [
      { type: 'Sovereign Wealth Funds & Foreign Central Banks', pct: 45 },
      { type: 'Corporate & Public Pension Plans', pct: 40 },
      { type: 'University Endowments & Foundations', pct: 15 }
    ],
    feeTypes: ['Base management fee (0.50% - 1.25%)', 'Performance fee (20% above cash benchmark)'],
    primaryStrategy: 'Systematic global macro: Pure Alpha (directional macro bets) & All Weather (risk parity asset allocation)',
    sourceUrl: 'https://adviserinfo.sec.gov/firm/summary/104518',
    filingDate: '2026-03-31',
    notes: 'Ray Dalio’s systematic macro shop, famous for pioneering the Risk Parity framework.'
  },
  {
    id: 'cvc',
    name: 'CVC Credit & Capital',
    legalEntity: 'CVC Credit Partners LLC / CVC Capital',
    crd: '153205',
    secNumber: '801-71542',
    primaryLocation: 'New York, NY / London, UK',
    regulatoryAum: 195000000000,
    aumFormatted: '$195 Billion',
    discretionaryAum: 185250000000,
    nonDiscretionaryAum: 9750000000,
    discretionaryPct: 95,
    clientTypes: [
      { type: 'Collateralized Loan Obligations (CLOs) & Structured Debt', pct: 48 },
      { type: 'Pension Funds & Sovereign Investors', pct: 36 },
      { type: 'Private Wealth & Family Offices', pct: 16 }
    ],
    feeTypes: ['Base management fee (1.25% - 1.75%)', 'Carried interest (15% - 20% on private equity & credit funds)'],
    primaryStrategy: 'European private equity buyouts, global direct lending, liquid credit, and secondary investments',
    sourceUrl: 'https://adviserinfo.sec.gov/firm/summary/153205',
    filingDate: '2026-03-28',
    notes: 'Leading European private equity and credit firm listed on Euronext Amsterdam.'
  }
];
