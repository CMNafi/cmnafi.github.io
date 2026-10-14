/**
 * Illustrative capital-market assumptions for the /claude CaiaFrontierSandbox island.
 *
 * These are round teaching numbers chosen for this widget, NOT forecasts and not taken from any
 * provider. The CAIA content in this repo (src/content/caia, src/pages/caia) explains the
 * concepts (Sharpe ratio, endowment model, smoothing of appraisal-based returns) but contains no
 * return/volatility/correlation figures, so nothing here is sourced from it.
 *
 * Volatilities for private equity, private debt and real assets are meant to be "de-smoothed"
 * (closer to economic risk than to reported, appraisal-based volatility).
 *
 * Fixed income is an extra sleeve beyond the three in the brief, because a 60/40 portfolio cannot
 * be expressed without bonds. Private equity and private debt are separate sliders under one
 * "Private equity & private debt" heading so the "Private Credit Heavy" preset means something.
 */

export type SleeveId = 'public-equity' | 'fixed-income' | 'private-equity' | 'private-debt' | 'real-assets-hf';

export interface Sleeve {
  id: SleeveId;
  label: string;
  short: string;
  group: 'Public markets' | 'Private equity & private debt' | 'Real assets & hedge funds';
  /** Expected annual return, % */
  expectedReturn: number;
  /** Annualized volatility, % */
  volatility: number;
}

export const SLEEVES: Sleeve[] = [
  { id: 'public-equity', label: 'Public equities', short: 'Equities', group: 'Public markets', expectedReturn: 7.0, volatility: 16 },
  { id: 'fixed-income', label: 'Fixed income', short: 'Bonds', group: 'Public markets', expectedReturn: 4.0, volatility: 6 },
  { id: 'private-equity', label: 'Private equity', short: 'PE', group: 'Private equity & private debt', expectedReturn: 9.5, volatility: 22 },
  { id: 'private-debt', label: 'Private debt', short: 'Private debt', group: 'Private equity & private debt', expectedReturn: 7.0, volatility: 12 },
  { id: 'real-assets-hf', label: 'Real assets & hedge funds', short: 'Real assets & HF', group: 'Real assets & hedge funds', expectedReturn: 6.0, volatility: 10 }
];

/** Correlation matrix, same order as SLEEVES (symmetric, positive definite). */
export const CORRELATIONS: number[][] = [
  [1.0, 0.1, 0.75, 0.6, 0.55],
  [0.1, 1.0, 0.1, 0.25, 0.2],
  [0.75, 0.1, 1.0, 0.55, 0.5],
  [0.6, 0.25, 0.55, 1.0, 0.45],
  [0.55, 0.2, 0.5, 0.45, 1.0]
];

/** Cash / risk-free rate used in the Sharpe ratio, % */
export const RISK_FREE = 3.0;

/** Heuristic used for the drawdown estimate: severe drawdown ≈ k × annual volatility */
export const DRAWDOWN_MULTIPLE = 3;

export interface AllocationPreset {
  id: string;
  label: string;
  /** Weights in % , same order as SLEEVES, summing to 100 */
  weights: number[];
  note: string;
}

export const PRESETS: AllocationPreset[] = [
  {
    id: 'sixty-forty',
    label: '60/40 Traditional',
    weights: [60, 40, 0, 0, 0],
    note: '60% public equities, 40% bonds, nothing private.'
  },
  {
    id: 'endowment',
    label: 'Endowment Model',
    weights: [25, 10, 30, 10, 25],
    note: 'An illustrative endowment-style mix, heavy in private equity and real assets. Not any specific endowment’s allocation.'
  },
  {
    id: 'private-credit',
    label: 'Private Credit Heavy',
    weights: [35, 15, 10, 30, 10],
    note: 'An illustrative mix that leans on private debt for income.'
  }
];

export const DEFAULT_PRESET_ID = 'sixty-forty';

/* ---------- Portfolio math (shared by the server render and the client script) ---------- */

export interface PortfolioStats {
  /** Expected return, % */
  expectedReturn: number;
  /** Annualized volatility, % */
  volatility: number;
  sharpe: number | null;
  /**
   * Weighted average pairwise correlation between the sleeves held:
   * sum over pairs i<j of w_i * w_j * rho_ij, divided by sum over pairs of w_i * w_j.
   * Null when fewer than two sleeves are held.
   */
  avgCorrelation: number | null;
  /** Heuristic severe drawdown, % (DRAWDOWN_MULTIPLE x volatility, capped at 100) */
  drawdown: number;
  /** Share in private equity, private debt, real assets and hedge funds, % */
  lessLiquidShare: number;
}

export function portfolioStats(weightsPct: number[]): PortfolioStats {
  const w = SLEEVES.map((_, i) => (weightsPct[i] ?? 0) / 100);
  let expectedReturn = 0;
  let variance = 0;
  let pairNum = 0;
  let pairDen = 0;
  for (let i = 0; i < SLEEVES.length; i += 1) {
    expectedReturn += w[i] * SLEEVES[i].expectedReturn;
    for (let j = 0; j < SLEEVES.length; j += 1) {
      variance += w[i] * w[j] * SLEEVES[i].volatility * SLEEVES[j].volatility * CORRELATIONS[i][j];
      if (j > i) {
        pairNum += w[i] * w[j] * CORRELATIONS[i][j];
        pairDen += w[i] * w[j];
      }
    }
  }
  const volatility = Math.sqrt(Math.max(0, variance));
  return {
    expectedReturn,
    volatility,
    sharpe: volatility > 0 ? (expectedReturn - RISK_FREE) / volatility : null,
    avgCorrelation: pairDen > 1e-9 ? pairNum / pairDen : null,
    drawdown: Math.min(100, DRAWDOWN_MULTIPLE * volatility),
    lessLiquidShare: (w[2] + w[3] + w[4]) * 100
  };
}

export interface FrontierPoint {
  volatility: number;
  expectedReturn: number;
  weights: number[];
}

/**
 * Long-only efficient frontier by brute force over a weight grid (default 2% steps, about
 * 316,000 portfolios for five sleeves): the upper envelope of return for each level of risk.
 * Cheap enough to run at build time.
 */
const frontierCache = new Map<number, { frontier: FrontierPoint[]; maxSharpe: FrontierPoint }>();

export function efficientFrontier(stepPct = 2): { frontier: FrontierPoint[]; maxSharpe: FrontierPoint } {
  const cached = frontierCache.get(stepPct);
  if (cached) return cached;
  const n = Math.round(100 / stepPct);
  const all: FrontierPoint[] = [];
  for (let a = 0; a <= n; a += 1)
    for (let b = 0; b <= n - a; b += 1)
      for (let c = 0; c <= n - a - b; c += 1)
        for (let d = 0; d <= n - a - b - c; d += 1) {
          const weights = [a, b, c, d, n - a - b - c - d].map((x) => (x * 100) / n);
          const s = portfolioStats(weights);
          all.push({ volatility: s.volatility, expectedReturn: s.expectedReturn, weights });
        }
  all.sort((p, q) => p.volatility - q.volatility);
  const frontier: FrontierPoint[] = [];
  let best = -Infinity;
  for (const p of all) {
    if (p.expectedReturn > best + 1e-9) {
      best = p.expectedReturn;
      frontier.push(p);
    }
  }
  let maxSharpe = frontier[0];
  for (const p of frontier) {
    if ((p.expectedReturn - RISK_FREE) / p.volatility > (maxSharpe.expectedReturn - RISK_FREE) / maxSharpe.volatility) maxSharpe = p;
  }
  const result = { frontier, maxSharpe };
  frontierCache.set(stepPct, result);
  return result;
}

/**
 * Linked sliders: set sleeve `index` to `value` and rescale the others proportionally so the
 * total stays 100. Integer weights via largest remainder.
 */
export function rebalance(weights: number[], index: number, value: number): number[] {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const rest = 100 - v;
  const others = weights.map((w, i) => (i === index ? 0 : Math.max(0, w)));
  const sumOthers = others.reduce((s, w) => s + w, 0);
  const count = weights.length - 1;
  const raw = weights.map((_, i) => {
    if (i === index) return v;
    return sumOthers > 0 ? (others[i] / sumOthers) * rest : rest / count;
  });
  const floored = raw.map((x, i) => (i === index ? x : Math.floor(x)));
  let remainder = 100 - floored.reduce((s, x) => s + x, 0);
  const order = raw
    .map((x, i) => ({ i, frac: i === index ? -1 : x - Math.floor(x) }))
    .sort((p, q) => q.frac - p.frac);
  for (const { i } of order) {
    if (remainder <= 0) break;
    if (i === index) continue;
    floored[i] += 1;
    remainder -= 1;
  }
  return floored;
}
