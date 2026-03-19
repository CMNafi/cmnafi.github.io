import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(['Books', 'Movies', 'Games', 'Cricket', 'Essays', 'Notes', 'Travel', 'Product']),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    excerpt: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    readingTime: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    status: z.enum(['brewing', 'live', 'beta', 'archived']),
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
    region: z.string(),
    period: z.string(),
    theme: z.string(),
    summary: z.string(),
    mapX: z.string(),
    mapY: z.string(),
    featured: z.boolean().default(false),
    deepLinkLabel: z.string(),
    atlasLabel: z.string(),
    highlights: z.array(z.string()).default([]),
    pullQuote: z.string().optional(),
    statLabel: z.string().optional(),
    statValue: z.string().optional()
  })
});

export const collections = { blog, projects, now, journey };


