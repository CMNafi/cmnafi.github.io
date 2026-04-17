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
    liveUrl: z.string().url().optional(),
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

export const collections = { 'field-notes': fieldNotes, projects, now, journey };
