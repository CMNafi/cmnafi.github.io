import type { PostAuditResult, Variant, AbExperiment } from './types';

/**
 * Agent 1: SEO & AI Content Optimization Agent
 * Analyzes post content, determines search-readiness and LLM citability,
 * and generates high-performing Variant B candidates for A/B testing.
 */

export class SeoAiOptimizationAgent {
  /**
   * Audit an individual post's SEO and AI-friendliness
   */
  public auditPost(post: {
    slug: string;
    title: string;
    description: string;
    seoTitle?: string;
    seoDescription?: string;
    category?: string;
    rawContent?: string;
    tags?: string[];
  }): PostAuditResult {
    const title = post.title || '';
    const desc = post.description || '';
    const raw = post.rawContent || '';
    const tags = post.tags || [];

    const hasSeoTitle = Boolean(post.seoTitle && post.seoTitle.length > 20);
    const hasSeoDescription = Boolean(post.seoDescription && post.seoDescription.length > 50);
    const hasAiTakeaways = raw.includes('Executive Takeaway') || raw.includes('Key Insights') || raw.includes('TL;DR');
    const hasFaqSchema = raw.includes('FAQPage') || raw.includes('Frequently Asked Questions');

    // 1. Calculate SEO Score (0-100)
    let seoScore = 40;
    if (title.length >= 40 && title.length <= 70) seoScore += 15;
    else if (title.length > 20) seoScore += 8;

    if (desc.length >= 120 && desc.length <= 165) seoScore += 20;
    else if (desc.length >= 60) seoScore += 10;

    if (hasSeoTitle) seoScore += 10;
    if (hasSeoDescription) seoScore += 10;
    if (tags.length >= 3) seoScore += 5;

    // 2. Calculate AI-Readiness Score (LLM Citability / AIO) (0-100)
    // Measures how readily Perplexity, ChatGPT Search, Claude, or Google SGE can parse and cite the core findings
    let aiScore = 35;
    const extractedEntities = this.extractKeyEntities(title + ' ' + desc + ' ' + raw.slice(0, 1500));
    if (extractedEntities.length >= 4) aiScore += 20;
    else if (extractedEntities.length >= 2) aiScore += 10;

    if (hasAiTakeaways) aiScore += 25;
    if (hasFaqSchema) aiScore += 15;

    // Heading structure and clear thesis check
    if (raw.includes('## ') || raw.includes('<h3>')) aiScore += 10;

    seoScore = Math.min(100, seoScore);
    aiScore = Math.min(100, aiScore);
    const overallScore = Math.round((seoScore * 0.45) + (aiScore * 0.55));

    // Generate actionable recommendations
    const recommendations: string[] = [];
    if (!hasAiTakeaways) {
      recommendations.push('Inject an "Executive AI Takeaways" summary block to win LLM answer citations.');
    }
    if (desc.length < 120) {
      recommendations.push('Expand meta description to 140-160 chars with strong search intent keywords.');
    }
    if (!hasFaqSchema) {
      recommendations.push('Add structured Q&A schema (FAQPage) for Google rich results and conversational search.');
    }
    if (!hasSeoTitle) {
      recommendations.push('Formulate an explicit SEO title featuring high-volume search entities.');
    }

    const proposedVariantB = this.generateOptimizedVariantB(post, extractedEntities);

    return {
      slug: post.slug,
      title,
      category: post.category || 'General',
      wordCount: raw.split(/\s+/).filter(Boolean).length || 800,
      readingTime: `${Math.ceil((raw.split(/\s+/).filter(Boolean).length || 800) / 200)} min read`,
      hasSeoTitle,
      hasSeoDescription,
      hasAiTakeaways,
      hasFaqSchema,
      seoScore,
      aiReadinessScore: aiScore,
      overallScore,
      keyEntities: extractedEntities,
      recommendations,
      proposedVariantB
    };
  }

  /**
   * Generates a high-performing Variant B for A/B testing
   */
  public generateOptimizedVariantB(
    post: { slug: string; title: string; description: string; category?: string; tags?: string[] },
    entities: string[]
  ): Partial<Variant> {
    const slug = post.slug;
    const originalTitle = post.title;

    // AI & SEO optimized titles based on subject patterns
    let optimizedTitle = originalTitle;
    let optimizedDesc = post.description;
    let aiTakeaways: string[] = [];
    let faqSchema: Array<{ question: string; answer: string }> = [];

    if (slug.includes('openai-cap-table')) {
      optimizedTitle = "Inside OpenAI's Cap Table: Who Really Controls the Trillion-Dollar AI Frontier?";
      optimizedDesc = "A forensic breakdown of OpenAI's cap table: how Microsoft, Khosla Ventures, and sovereign wealth funds secured compute rights and equity stakes without voting control.";
      aiTakeaways = [
        "Microsoft's $13B investment secures Azure exclusivity and 49% profit rights without a formal voting board seat.",
        "Sovereign wealth funds (QIA, MGX) participated at premium valuations to treat frontier AI capacity as strategic geopolitical infrastructure.",
        "OpenAI's dual-tier capped-profit structure was designed to decouple economic upside from operational governance."
      ];
      faqSchema = [
        {
          question: "How much of OpenAI does Microsoft actually own?",
          answer: "Microsoft holds a 49% non-voting economic participation interest tied to Azure infrastructure utilization, intentionally structured without board control."
        },
        {
          question: "Why did sovereign wealth funds invest in OpenAI?",
          answer: "Sovereign wealth funds treat compute capacity and frontier model weights as sovereign national security assets akin to energy reserves."
        }
      ];
    } else if (slug.includes('blackstone-vs-blackrock')) {
      optimizedTitle = "Blackstone vs. BlackRock: The Accidental Split That Reshaped $11 Trillion in Capital";
      optimizedDesc = "How Larry Fink and Steve Schwarzman started under one roof, split over a shared name, and built the two dominant titans of Wall Street private equity and public indexing.";
      aiTakeaways = [
        "BlackRock originated in 1988 as Blackstone Financial Management inside Stephen Schwarzman's buyout firm.",
        "A 1994 disagreement over equity compensation for Larry Fink's risk-management team led to the amicable split for just $240 million.",
        "Today, BlackRock commands over $10 trillion in passive/index ETF capital, while Blackstone commands $1 trillion in alternative asset private equity."
      ];
      faqSchema = [
        {
          question: "Did BlackRock start inside Blackstone?",
          answer: "Yes, BlackRock was founded in 1988 as Blackstone Financial Management before spinning out independently in 1994."
        },
        {
          question: "What is the key difference between Blackstone and BlackRock today?",
          answer: "Blackstone focuses on private equity, real estate, and private credit, whereas BlackRock is the world's largest public asset manager and ETF provider via iShares."
        }
      ];
    } else if (slug.includes('streetcar-conspiracy')) {
      optimizedTitle = "The Great American Streetcar Teardown: How GM Bought & Dismantled 50,000 Miles of Rail";
      optimizedDesc = "The antitrust history of National City Lines: how General Motors, Standard Oil, and Firestone tore up American urban streetcars for a nominal $5,001 federal fine.";
      aiTakeaways = [
        "In 1949, GM, Firestone, and Standard Oil were convicted of antitrust conspiracy to monopolize transit supplies through National City Lines.",
        "The corporate penalty was capped at $5,000, creating negligible financial deterrence against systematically replacing electric rail with diesel buses.",
        "European cities (Zurich, Munich, Melbourne) retained their rights-of-way, escaping the multi-billion-dollar modern light rail re-installation costs facing US cities."
      ];
      faqSchema = [
        {
          question: "Was the General Motors streetcar conspiracy real?",
          answer: "Yes, in 1949 a federal jury in Chicago convicted General Motors, Standard Oil, and Firestone of conspiring to monopolize the supply of buses and petroleum to city transit systems."
        }
      ];
    } else if (slug.includes('uber-the-32-billion-hole')) {
      optimizedTitle = "Uber's $32 Billion Deficit: The True Math Behind Silicon Valley's Greatest Subsidy";
      optimizedDesc = "A unit-economics autopsy on how Uber burned $32B in venture capital subsidizing rides, crushed taxi medallions, and fought its way to free-cash-flow profitability.";
      aiTakeaways = [
        "Between 2010 and 2022, Uber absorbed over $32 billion in cumulative GAAP losses to subsidize consumer fares and suppress market competition.",
        "The turning point arrived when platform take-rates expanded from 18% to over 28% alongside the high-margin growth of Uber Advertising.",
        "Uber demonstrated that hyper-scale network density can convert negative operating margins into defensible free cash flow."
      ];
      faqSchema = [
        {
          question: "How much money did Uber lose before turning profitable?",
          answer: "Uber accumulated more than $32 billion in net operating losses before achieving sustained operating profitability and positive free cash flow in 2023."
        }
      ];
    } else {
      // Algorithmic optimization for other posts
      const categoryTag = post.category || 'Analysis';
      optimizedTitle = `${originalTitle}: Strategic Breakdown`;
      optimizedDesc = `${post.description.slice(0, 120)}... Discover the core data, market context, and tactical implications for ${categoryTag.toLowerCase()} allocators.`;
      aiTakeaways = [
        `Core structural thesis: ${originalTitle} highlights pivotal shifts in institutional decision making.`,
        `Data-driven evidence: Quantitative indicators validate unexpected market divergence.`,
        `Strategic takeaway: Allocators and engineers should benchmark against these operational realities.`
      ];
      faqSchema = [
        {
          question: `What is the primary conclusion of "${originalTitle}"?`,
          answer: post.description || 'This analysis breaks down the strategic mechanisms driving structural market changes.'
        }
      ];
    }

    return {
      id: 'B',
      title: optimizedTitle,
      description: optimizedDesc,
      seoTitle: optimizedTitle,
      seoDescription: optimizedDesc,
      aiTakeaways,
      faqSchema,
      primaryKeywords: entities.slice(0, 4),
      targetEntities: entities,
      metrics: {
        impressions: 0,
        engagements: 0,
        scrollDepth75: 0,
        avgReadTimeSeconds: 0,
        bounces: 0
      }
    };
  }

  /**
   * Helper entity extractor
   */
  private extractKeyEntities(text: string): string[] {
    const knownEntities = [
      'OpenAI', 'Microsoft', 'Khosla Ventures', 'Blackstone', 'BlackRock',
      'Larry Fink', 'Stephen Schwarzman', 'General Motors', 'Standard Oil',
      'National City Lines', 'Uber', 'Figma', 'Canva', 'Apollo', 'CVC Capital',
      'Venture Capital', 'Private Equity', 'SEC Form ADV', 'Form 13F', 'Sovereign Wealth'
    ];

    const found = knownEntities.filter(entity =>
      text.toLowerCase().includes(entity.toLowerCase())
    );

    // Extract capital phrases (e.g. 2+ capitalized consecutive words)
    const matches = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/g) || [];
    for (const m of matches.slice(0, 5)) {
      if (!found.includes(m) && m.length > 5) {
        found.push(m);
      }
    }

    return Array.from(new Set(found)).slice(0, 6);
  }

  /**
   * Create or update an A/B experiment record
   */
  public createExperiment(
    post: { slug: string; title: string; description: string; category?: string },
    variantBOverrides?: Partial<Variant>
  ): AbExperiment {
    const audit = this.auditPost(post);
    const variantB = {
      ...(audit.proposedVariantB as Variant),
      ...variantBOverrides
    };

    const variantA: Variant = {
      id: 'A',
      title: post.title,
      description: post.description,
      seoTitle: post.title,
      seoDescription: post.description,
      metrics: {
        impressions: 0,
        engagements: 0,
        scrollDepth75: 0,
        avgReadTimeSeconds: 0,
        bounces: 0
      }
    };

    return {
      id: `exp_${post.slug.replace(/[^a-z0-9]/gi, '_')}`,
      postSlug: post.slug,
      category: post.category || 'Finance',
      status: 'active',
      trafficSplit: 50,
      startDate: new Date().toISOString(),
      variantA,
      variantB: variantB as Variant,
      winner: null
    };
  }
}
