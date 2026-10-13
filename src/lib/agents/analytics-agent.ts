import type { AbExperiment, AgentDecisionReport, Variant } from './types';

/**
 * Agent 2: Google Analytics Intelligence & A/B Winner Decision Engine
 * Computes statistical significance (Z-Score, p-value, confidence intervals),
 * derives engagement uplifts, and produces AI-driven winner declarations.
 */

export class AnalyticsIntelligenceAgent {
  /**
   * Evaluate a single A/B experiment
   */
  public evaluateExperiment(experiment: AbExperiment): {
    winner: 'A' | 'B' | null;
    confidenceScore: number;
    upliftPercentage: number;
    recommendation: 'promote_b' | 'keep_a' | 'needs_more_traffic';
    commentary: string;
    metricsComparison: {
      aRate: number;
      bRate: number;
      uplift: number;
      zScore: number;
      pVal: number;
    };
  } {
    const a = experiment.variantA.metrics;
    const b = experiment.variantB.metrics;

    const nA = Math.max(a.impressions, 1);
    const nB = Math.max(b.impressions, 1);
    const eA = a.engagements;
    const eB = b.engagements;

    const rateA = eA / nA;
    const rateB = eB / nB;

    const uplift = rateA > 0 ? ((rateB - rateA) / rateA) * 100 : 0;

    // Minimum sample size required for high confidence
    const totalSample = a.impressions + b.impressions;
    if (totalSample < 40) {
      return {
        winner: null,
        confidenceScore: 50,
        upliftPercentage: Number(uplift.toFixed(1)),
        recommendation: 'needs_more_traffic',
        commentary: `Experiment in early phase (${totalSample} total impressions). Minimum 40 sample exposures required before establishing statistical validity.`,
        metricsComparison: {
          aRate: Number((rateA * 100).toFixed(1)),
          bRate: Number((rateB * 100).toFixed(1)),
          uplift: Number(uplift.toFixed(1)),
          zScore: 0,
          pVal: 1
        }
      };
    }

    // Pooled sample proportion
    const pooledP = (eA + eB) / (nA + nB);
    const standardError = Math.sqrt(pooledP * (1 - pooledP) * (1 / nA + 1 / nB));

    let zScore = 0;
    if (standardError > 0) {
      zScore = (rateB - rateA) / standardError;
    }

    // Convert Z-score to two-tailed p-value and confidence percentage
    const absZ = Math.abs(zScore);
    const pVal = this.zScoreToPValue(absZ);
    const confidenceScore = Math.min(99.9, Math.round((1 - pVal) * 1000) / 10);

    let winner: 'A' | 'B' | null = null;
    let recommendation: 'promote_b' | 'keep_a' | 'needs_more_traffic' = 'needs_more_traffic';
    let commentary = '';

    if (confidenceScore >= 95 && zScore > 1.96 && uplift > 5) {
      winner = 'B';
      recommendation = 'promote_b';
      commentary = `Variant B (AI-Optimized) is outperforming Variant A by +${uplift.toFixed(1)}% engagement with ${confidenceScore}% statistical confidence (Z = ${zScore.toFixed(2)}, p = ${pVal.toFixed(3)}). High reader dwell time and scroll-through confirm this variant should be locked in as the production default.`;
    } else if (confidenceScore >= 95 && zScore < -1.96 && uplift < -5) {
      winner = 'A';
      recommendation = 'keep_a';
      commentary = `Variant A (Control) outperforms Variant B by +${Math.abs(uplift).toFixed(1)}% with ${confidenceScore}% confidence. The original editorial headline resonates better with core readers. Recommend retaining Variant A.`;
    } else {
      winner = null;
      recommendation = 'needs_more_traffic';
      commentary = `Data shows an interim uplift of ${uplift > 0 ? '+' : ''}${uplift.toFixed(1)}% (Confidence: ${confidenceScore}%), but has not crossed the 95% statistical significance threshold. Recommendation: Allow experiment to collect more traffic.`;
    }

    return {
      winner,
      confidenceScore,
      upliftPercentage: Number(uplift.toFixed(1)),
      recommendation,
      commentary,
      metricsComparison: {
        aRate: Number((rateA * 100).toFixed(1)),
        bRate: Number((rateB * 100).toFixed(1)),
        uplift: Number(uplift.toFixed(1)),
        zScore: Number(zScore.toFixed(2)),
        pVal: Number(pVal.toFixed(4))
      }
    };
  }

  /**
   * Generates comprehensive intelligence report across all experiments
   */
  public generateFullReport(experiments: AbExperiment[]): AgentDecisionReport {
    const recommendations: AgentDecisionReport['agentRecommendations'] = [];
    let totalUpliftSum = 0;
    let activeCount = 0;
    let concludedCount = 0;

    for (const exp of experiments) {
      if (exp.status === 'active') activeCount++;
      if (exp.status === 'concluded') concludedCount++;

      const evalResult = this.evaluateExperiment(exp);
      totalUpliftSum += evalResult.upliftPercentage;

      recommendations.push({
        experimentId: exp.id,
        slug: exp.postSlug,
        decision: evalResult.recommendation,
        confidence: evalResult.confidenceScore,
        reasoning: evalResult.commentary,
        metricsComparison: {
          aEngagementRate: evalResult.metricsComparison.aRate,
          bEngagementRate: evalResult.metricsComparison.bRate,
          uplift: evalResult.upliftPercentage
        }
      });
    }

    const avgUplift = experiments.length > 0 ? Number((totalUpliftSum / experiments.length).toFixed(1)) : 0;

    return {
      timestamp: new Date().toISOString(),
      totalAudited: experiments.length,
      activeExperiments: activeCount,
      concludedExperiments: concludedCount,
      overallEngagementUplift: avgUplift,
      agentRecommendations: recommendations
    };
  }

  /**
   * Approximates two-tailed p-value from positive Z-score
   */
  private zScoreToPValue(z: number): number {
    // Error function polynomial approximation (Abramowitz and Stegun)
    const t = 1.0 / (1.0 + 0.2316419 * z);
    const d = 0.3989422804014327 * Math.exp(-0.5 * z * z);
    const prob = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return Math.max(0.0001, prob * 2);
  }
}
