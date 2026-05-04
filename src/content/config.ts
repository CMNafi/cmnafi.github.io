import { defineCollection, z } from 'astro:content';

const fieldNotes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(['Books', 'Finance', 'Cricket', 'Brewing']),
    subCategory: z.enum(['Venture Capital', 'Private Equity', 'Public Equities', 'Macro', 'General']).optional(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    excerpt: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    readingTime: z.string(),
    layout: z.string().optional(),
    accentColor: z.string().optional(),
    paperColor: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
  }).refine(data => {
    if (data.category === 'Finance' && !data.subCategory) {
      return false;
    }
    return true;
  }, {
    message: "A field note categorized as 'Finance' MUST specify a valid 'subCategory'.",
    path: ["subCategory"]
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    status: z.enum(['live', 'brewing', 'parked']),
    category: z.enum(['data tool', 'web app', 'research', 'automation', 'writing']),
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    priority: z.number().default(0),
    startedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    problem: z.string(),
    solution: z.string(),
    whoItsFor: z.string(),
    keyFeatures: z.array(z.string()).default([]),
    roadmap: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    relatedPosts: z.array(z.string()).default([])
  }).refine(data => {
    if (data.featured && data.status !== 'live') {
      return false;
    }
    return true;
  }, {
    message: "A project marked 'featured: true' must have 'status: live'. Brewing/parked projects cannot be featured.",
    path: ["featured"]
  })
});

const now = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    updatedAt: z.coerce.date(),
    building: z.array(z.string()).default([]),
    reading: z.array(z.string()).default([]),
    exploring: z.array(z.string()).default([]),
    meeting: z.array(z.string()).default([])
  })
});

const journey = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    place: z.string(),
    organization: z.string(),
    role: z.string().optional(),
    blurb: z.string().optional(),
    region: z.string(),
    period: z.string(),
    theme: z.string(),
    summary: z.string(),
    personalTheme: z.string().optional(),
    professionalSummary: z.string().optional(),
    personalSummary: z.string().optional(),
    mapX: z.string(),
    mapY: z.string(),
    featured: z.boolean().default(false),
    deepLinkLabel: z.string(),
    atlasLabel: z.string(),
    highlights: z.array(z.string()).default([]),
    professionalHighlights: z.array(z.string()).default([]),
    personalHighlights: z.array(z.string()).default([]),
    pullQuote: z.string().optional(),
    professionalPullQuote: z.string().optional(),
    personalPullQuote: z.string().optional(),
    statLabel: z.string().optional(),
    statValue: z.string().optional()
  })
});

const caia = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    level: z.enum(['I', 'II']),
    topicNumber: z.number(),
    examWeight: z.string(),
    timeToMastery: z.string(),
    lastReviewed: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
  })
});

const wcTeams = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    code: z.string().length(3),
    fifaRanking: z.number().optional(),
    group: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']),
    coach: z.string().optional(),
    captain: z.string().optional(),
    baseCamp: z.string().optional(),
    status: z.enum(['qualified', 'active', 'eliminated', 'champion']).default('qualified'),
  })
});

const wcStadiums = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    city: z.string(),
    country: z.enum(['USA', 'Canada', 'Mexico']),
    capacity: z.number(),
    opened: z.number(),
    surface: z.string(),
    roof: z.boolean().default(false),
    climate: z.string().optional(),
    transit: z.string().optional()
  })
});

const wcEditorial = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string().default('Nafi'),
    tags: z.array(z.string()).default([]),
    relatedTeams: z.array(z.string()).default([]),
  })
});

export const collections = {
  'field-notes': fieldNotes,
  projects,
  now,
  journey,
  caia,
  'wc-teams': wcTeams,
  'wc-stadiums': wcStadiums,
  'wc-editorial': wcEditorial
};
