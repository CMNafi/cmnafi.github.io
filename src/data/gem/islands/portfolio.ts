export interface AssetClass {
  id: string;
  name: string;
  shortName: string;
  expectedReturn: number; // e.g. 0.08 for 8%
  annualizedVol: number;  // e.g. 0.16 for 16%
  description: string;
}

export const assetClasses: AssetClass[] = [
  {
    id: 'public-equities',
    name: 'Global Public Equities',
    shortName: 'Public Equities',
    expectedReturn: 0.082,
    annualizedVol: 0.165,
    description: 'MSCI World / S&P 500 equity exposure, high liquidity, equity beta risk factor'
  },
  {
    id: 'pe-private-debt',
    name: 'Private Equity & Direct Lending',
    shortName: 'PE & Private Debt',
    expectedReturn: 0.118,
    annualizedVol: 0.190,
    description: 'Illiquidity premium, leveraged buyout cash flows, senior secured private credit spreads'
  },
  {
    id: 'real-assets-hedge',
    name: 'Real Assets & Absolute Return',
    shortName: 'Real Assets & Hedge Funds',
    expectedReturn: 0.075,
    annualizedVol: 0.105,
    description: 'Infrastructure, inflation-hedging real estate, market-neutral and multi-strategy alpha'
  }
];

// Correlation matrix between the 3 asset classes
export const correlationMatrix: number[][] = [
  [1.00, 0.68, 0.32], // Public Equities
  [0.68, 1.00, 0.42], // PE & Private Debt
  [0.32, 0.42, 1.00]  // Real Assets & Hedge Funds
];

export const riskFreeRate = 0.040; // 4.0% risk-free hurdle

export interface PortfolioResult {
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
  crossAssetCorrelation: number;
  estimatedMaxDrawdown: number;
}

export function calculatePortfolio(weights: number[]): PortfolioResult {
  // weights are percentages [w1, w2, w3] summing to 100
  const w = weights.map((v) => Math.max(0, v) / 100);
  const total = w.reduce((sum, v) => sum + v, 0) || 1;
  const nw = w.map((v) => v / total);

  // Expected Return: sum(w_i * r_i)
  const meanReturn = nw.reduce((sum, weight, idx) => sum + weight * assetClasses[idx].expectedReturn, 0);

  // Portfolio Variance: sum_i sum_j (w_i * w_j * vol_i * vol_j * corr_ij)
  let variance = 0;
  let weightedCorrSum = 0;
  let weightedCorrPairs = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cov = nw[i] * nw[j] * assetClasses[i].annualizedVol * assetClasses[j].annualizedVol * correlationMatrix[i][j];
      variance += cov;

      if (i < j && nw[i] > 0 && nw[j] > 0) {
        weightedCorrSum += nw[i] * nw[j] * correlationMatrix[i][j];
        weightedCorrPairs += nw[i] * nw[j];
      }
    }
  }

  const volatility = Math.sqrt(Math.max(0.0001, variance));
  const sharpe = (meanReturn - riskFreeRate) / volatility;
  const avgCorr = weightedCorrPairs > 0 ? weightedCorrSum / weightedCorrPairs : 0.45;

  // Cornish-Fisher / Empirical proxy for max drawdown: ~ 2.4 * Vol - 0.5 * Return
  const drawdown = Math.max(0.04, 2.3 * volatility - 0.4 * meanReturn);

  return {
    expectedReturn: meanReturn,
    volatility,
    sharpeRatio: Math.max(0, sharpe),
    crossAssetCorrelation: avgCorr,
    estimatedMaxDrawdown: drawdown
  };
}

export function normalizeSliders(weights: number[], changedIndex: number, requestedValue: number): number[] {
  const clamped = Math.max(0, Math.min(100, Math.round(requestedValue)));
  const remainder = 100 - clamped;
  const otherIndices = [0, 1, 2].filter((i) => i !== changedIndex);
  const otherCurrentSum = otherIndices.reduce((sum, i) => sum + weights[i], 0);

  const result = [...weights];
  result[changedIndex] = clamped;

  if (otherCurrentSum === 0) {
    const half = Math.floor(remainder / 2);
    result[otherIndices[0]] = half;
    result[otherIndices[1]] = remainder - half;
  } else {
    let allocated = 0;
    for (let k = 0; k < otherIndices.length; k++) {
      const idx = otherIndices[k];
      if (k === otherIndices.length - 1) {
        result[idx] = Math.max(0, remainder - allocated);
      } else {
        const share = Math.round((weights[idx] / otherCurrentSum) * remainder);
        result[idx] = Math.max(0, share);
        allocated += result[idx];
      }
    }
  }

  return result;
}

export interface FrontierPoint {
  weights: [number, number, number];
  volatility: number;
  expectedReturn: number;
}

export function computeEfficientFrontier(): FrontierPoint[] {
  const points: { weights: [number, number, number]; volatility: number; expectedReturn: number }[] = [];

  for (let eq = 0; eq <= 100; eq += 4) {
    for (let pe = 0; pe <= 100 - eq; pe += 4) {
      const ra = 100 - eq - pe;
      const res = calculatePortfolio([eq, pe, ra]);
      points.push({
        weights: [eq, pe, ra],
        volatility: res.volatility,
        expectedReturn: res.expectedReturn
      });
    }
  }

  // Filter for Pareto frontier: no other point has higher return with lower/equal volatility
  const efficient = points.filter((p) => {
    return !points.some(
      (other) =>
        other.volatility <= p.volatility &&
        other.expectedReturn >= p.expectedReturn &&
        (other.volatility < p.volatility || other.expectedReturn > p.expectedReturn)
    );
  });

  return efficient.sort((a, b) => a.volatility - b.volatility);
}

export const portfolioPresets: { id: string; name: string; weights: [number, number, number]; description: string }[] = [
  {
    id: 'traditional-60-40',
    name: 'Traditional 60 / 40',
    weights: [60, 0, 40],
    description: 'Classic liquid public equities balanced with core real assets and liquid defensive bonds.'
  },
  {
    id: 'endowment-model',
    name: 'Endowment Model (Swensen)',
    weights: [25, 45, 30],
    description: 'Pioneered by David Swensen at Yale: heavy illiquidity premium in private markets with real asset inflation guards.'
  },
  {
    id: 'private-credit-heavy',
    name: 'Private Credit & Direct Lending',
    weights: [20, 60, 20],
    description: 'High-income yield bias capturing contractual senior debt spreads with low equity volatility.'
  }
];
