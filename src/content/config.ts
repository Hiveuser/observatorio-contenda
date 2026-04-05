import { defineCollection, z } from 'astro:content';

const temas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    theme: z.enum(['arborizacao', 'clima', 'floresta', 'leis', 'car', 'pib']).optional(),
    source_url: z.string().url().optional(),
    source_org: z.string().optional(),
    confidence: z.number().min(0).max(1).optional(),
    collected_at: z.coerce.date().optional(),
    public: z.boolean().default(false),
  }),
});

export const collections = { temas };
