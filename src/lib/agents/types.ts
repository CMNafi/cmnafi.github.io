export interface Variant {
  id: 'A' | 'B';
  title: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  aiTakeaways?: string[];
  faqSchema?: Array<{ question: string; answer: string }>;
  primaryKeywords?: string[];
  targetEntities?: string[];
  metrics: {
    impressions: number;
    engagements: number;
    scrollDepth75: number;
    avgReadTimeSeconds: number;
    bounces: number;
  };
}

export interface AbExperiment {
  id: string;
  postSlug: string;
  category: string;
  status: 'active' | 'concluded' | 'paused';
  trafficSplit: number; // percentage sent to Variant B, typically 50
  startDate: string;
  concludedDate?: string;
  variantA: Variant;
  variantB: Variant;
  winner?: 'A' | 'B' | null;
  confidenceScore?: number; // 0-100%
  upliftPercentage?: number; // e.g. +28.4%
  agentAnalysis?: {
    recommendation: 'promote_b' | 'keep_a' | 'needs_more_traffic';
    commentary: string;
    evaluatedAt: string;
  };
}

export interface PostAuditResult {
  slug: string;
  title: string;
  category: string;
  wordCount: number;
  readingTime: string;
  hasSeoTitle: boolean;
  hasSeoDescription: boolean;
  hasAiTakeaways: boolean;
  hasFaqSchema: boolean;
  seoScore: number;       // 0 - 100
  aiReadinessScore: number; // 0 - 100 (LLM citability & structure)
  overallScore: number;   // weighted average
  keyEntities: string[];
  recommendations: string[];
  proposedVariantB?: Partial<Variant>;
}

export interface AgentDecisionReport {
  timestamp: string;
  totalAudited: number;
  activeExperiments: number;
  concludedExperiments: number;
  overallEngagementUplift: number;
  agentRecommendations: Array<{
    experimentId: string;
    slug: string;
    decision: 'promote_b' | 'keep_a' | 'run_longer';
    confidence: number;
    reasoning: string;
    metricsComparison: {
      aEngagementRate: number;
      bEngagementRate: number;
      uplift: number;
    };
  }>;
}
