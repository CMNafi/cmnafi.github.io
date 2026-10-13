import { visit } from 'unist-util-visit';

// Keyword → internal URL mapping
// Order matters: longer/more specific phrases first to avoid partial matches
const LINK_MAP = [
  // ── New Capital Lens blogs ──────────────────────────────────────────────
  { terms: ['sovereign wealth fund', 'sovereign wealth', 'SWF', 'QIA', 'Qatari Investment Authority', 'PIF', 'Public Investment Fund', 'MGX'],
    url: '/field-notes/sovereign-wealth-invasion', label: 'Sovereign Wealth Invasion' },

  { terms: ['extraction vs reinvestment', 'reinvestment playbook', 'extraction playbook'],
    url: '/field-notes/extraction-vs-reinvestment', label: 'Extraction vs. Reinvestment Playbook' },

  { terms: ['Andreessen Horowitz', 'a16z', 'a16z crypto', 'a16z bio'],
    url: '/field-notes/andreessen-horowitz', label: 'Andreessen Horowitz Deep Dive' },

  { terms: ['whisper number', 'beat-and-sell', 'IV crush', 'implied volatility crush'],
    url: '/field-notes/whisper-number-economy', label: 'The Whisper Number Economy' },

  { terms: ['Starlink', 'Amazon Kuiper', 'Kuiper', 'OneWeb', 'LEO constellation', 'low earth orbit broadband'],
    url: '/field-notes/starlink-vs-world', label: 'Starlink vs. The World' },

  { terms: ['mutual fund outflows', 'death of the mutual fund', 'active ETF', 'ETF revolution', 'iShares'],
    url: '/field-notes/death-of-mutual-fund', label: 'The Death of the Mutual Fund' },

  { terms: ['OpenAI cap table', "OpenAI's investors", 'OpenAI funding', 'OpenAI Series F'],
    url: '/field-notes/openai-cap-table', label: "OpenAI's Cap Table" },

  { terms: ['Dutch Bros Effect', 'founder culture moat', 'Dutch Creed'],
    url: '/field-notes/dutch-bros-effect', label: 'The Dutch Bros Effect' },

  { terms: ['CVC IPO', 'PE firms going public', 'listed PE', 'GP as asset'],
    url: '/field-notes/cvc-ipo-moment', label: "CVC's IPO Moment" },

  { terms: ['human capital PE', 'education private equity', 'accreditation moat', 'employer-funded learning', 'Guild Education'],
    url: '/field-notes/human-capital-education', label: '$100B Bet on Human Capital' },

  // ── Existing Capital Lens & finance blogs ───────────────────────────────
  { terms: ['Blackstone BXPE', 'BXPE', 'Royal Challengers Bengaluru', 'RCB acquisition'],
    url: '/field-notes/blackstone-ipl-acquisition', label: 'Blackstone Buys Into the IPL' },

  { terms: ['Blackstone vs BlackRock', 'Blackstone and BlackRock'],
    url: '/field-notes/blackstone-vs-blackrock', label: 'Blackstone vs. BlackRock' },

  { terms: ['Blackstone'],
    url: '/field-notes/blackstone-ipl-acquisition', label: 'Blackstone — Capital Lens' },

  { terms: ['BlackRock', 'BlackRock earnings', 'BlackRock Q1'],
    url: '/field-notes/blackstone-vs-blackrock', label: 'BlackRock — Capital Lens' },

  { terms: ['CVC Capital Partners', 'CVC Capital', 'Global Sport Group', 'GSG'],
    url: '/field-notes/cvc-capital-sports', label: 'CVC Capital Sports Deep Dive' },

  { terms: ['Liberty Media', 'Drive to Survive', 'Las Vegas Grand Prix'],
    url: '/field-notes/liberty-media-sports', label: 'Liberty Media Deep Dive' },

  { terms: ['Formula One', 'Formula 1', 'F1 ownership', 'F1 media rights'],
    url: '/field-notes/cvc-capital-sports', label: 'F1 — CVC & Liberty' },

  { terms: ['Apollo Global', 'Apollo Sports Capital', 'Atlético de Madrid'],
    url: '/field-notes/apollo-global-management-sports', label: 'Apollo Global Management' },

  { terms: ['Nasdaq Ventures', 'Nasdaq venture arm'],
    url: '/field-notes/nasdaq-ventures', label: 'Nasdaq Ventures Deep Dive' },

  { terms: ['Blackbird Ventures', 'Blackbird fund'],
    url: '/field-notes/blackbird-ventures', label: 'Blackbird Ventures' },

  { terms: ['corporate venture capital', 'corporate venture', 'CVC arm', 'strategic venture'],
    url: '/field-notes/corporate-venture-capital', label: 'Corporate Venture Capital' },

  { terms: ['greatest PE funds', '100 greatest private equity', 'top PE funds'],
    url: '/field-notes/greatest-pe-funds', label: '100 Greatest PE Funds' },

  { terms: ['greatest VC funds', '100 greatest venture capital funds', 'top VC funds'],
    url: '/field-notes/100-greatest-vc-funds', label: '100 Greatest VC Funds' },

  { terms: ['greatest VC bets', '100 greatest VC investments', 'top VC bets'],
    url: '/field-notes/greatest-vc-bets', label: '100 Greatest VC Bets' },

  { terms: ['Figma', 'FIG stock', 'Figma IPO'],
    url: '/field-notes/figma-the-billion-dollar-bet', label: 'Figma Deep Dive' },

  { terms: ['Canva vs Figma', 'Canva and Figma'],
    url: '/field-notes/canva-vs-figma', label: 'Canva vs. Figma' },

  { terms: ['Dutch Bros', 'Dutch Bros Coffee'],
    url: '/field-notes/dutch-bros', label: 'Dutch Bros — Capital Lens' },

  { terms: ['earnings volatility', 'post-earnings implied move', 'earnings swing'],
    url: '/field-notes/capital-lens-earnings-swings', label: 'The Earnings Volatility Trade' },

  { terms: ['covered call', 'covered calls', 'call vertical', 'call spread'],
    url: '/field-notes/the-covered-call-playbook', label: 'The Covered Call Playbook' },

  { terms: ['SpaceX IPO', 'SpaceX S-1', 'Project Apex'],
    url: '/field-notes/spacex-s1-teardown', label: 'SpaceX IPO — Project Apex' },

  { terms: ['IPL franchise', 'Indian Premier League franchise', 'IPL valuation'],
    url: '/field-notes/blackstone-ipl-acquisition', label: 'IPL Franchise Finance' },
];

export function remarkAutoLink() {
  return (tree, file) => {
    const filePath = file.history?.[0] ?? '';

    // Story chapters are personal prose with their own links; keyword links don't belong there
    if (/[\\/]content[\\/]journey[\\/]/.test(filePath)) return;

    // Get the current file's slug so we never link to self (works with / and \ paths)
    const currentSlug = filePath.split(/[\\/]/).pop()?.replace(/\.mdx?$/, '') ?? '';

    // Track which terms have been linked already (first-occurrence-only rule)
    const linked = new Set();

    visit(tree, 'text', (node, index, parent) => {
      // Skip nodes inside existing links, code blocks, headings
      if (!parent) return;
      const skip = ['link', 'inlineCode', 'code', 'heading'];
      if (skip.includes(parent.type)) return;

      let { value } = node;
      let modified = false;
      const newChildren = [];
      let remaining = value;

      for (const { terms, url, label } of LINK_MAP) {
        // Don't link to self
        if (currentSlug && url.endsWith(`/${currentSlug}`)) continue;

        for (const term of terms) {
          if (linked.has(term)) continue;

          const idx = remaining.search(new RegExp(`\\b${escapeRegex(term)}\\b`, 'i'));
          if (idx === -1) continue;

          const match = remaining.match(new RegExp(`\\b${escapeRegex(term)}\\b`, 'i'))?.[0];
          if (!match) continue;

          // Split at the match
          if (idx > 0) newChildren.push({ type: 'text', value: remaining.slice(0, idx) });
          newChildren.push({
            type: 'link',
            url,
            title: label,
            data: { hProperties: { class: 'cl-autolink' } },
            children: [{ type: 'text', value: match }],
          });
          remaining = remaining.slice(idx + match.length);
          linked.add(term);
          modified = true;
          break;
        }
      }

      if (modified) {
        if (remaining) newChildren.push({ type: 'text', value: remaining });
        parent.children.splice(index, 1, ...newChildren);
      }
    });
  };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
