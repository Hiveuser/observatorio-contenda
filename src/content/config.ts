import { defineCollection, z } from 'astro:content';

const temas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    theme: z.enum(['arborizacao', 'clima', 'floresta', 'leis', 'car', 'pib']).optional(),
    source_url: z.string().optional(),
    source_org: z.string().optional(),
    confidence: z.number().min(0).max(1).optional(),
    collected_at: z.coerce.date().optional(),
    public: z.boolean().default(false),
  }),
});

const projetos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['planejamento', 'ativo', 'pausado', 'concluido']).default('planejamento'),
    dominio: z.string().optional(),
    stack: z.string().optional(),
    mvp_prazo: z.string().optional(),
    created_at: z.coerce.date().optional(),
    public: z.boolean().default(false),
  }),
});

export const collections = { temas, projetos };
