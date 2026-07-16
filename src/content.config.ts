import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.enum(['AI Agents', 'CI/CD', 'Security', 'Tooling'])),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
