import { z } from 'zod';

// Define Blog Zod Schema
const BlogSchema = z.object({
  body: z.object({
    title: z.string().max(150, 'Title must be 150 characters or less'),

    slug: z.string(),

    content: z.string().min(100, 'Content must be at least 100 characters'),

    coverImage: z.string().optional(), // Optional cover image

    author: z.string(),

    tags: z
      .array(z.string().max(30, 'Tag must be 30 characters or less'))
      .optional(),

    category: z.string(),

    likes: z.number().int().min(0).default(0),

    comments: z.array(z.string()).optional(),

    publishedAt: z.string().optional(),

    status: z.enum(['draft', 'published', 'archived']).default('draft'),
  }),
});

const UpdateBlogSchema = z.object({
  body: z.object({
    title: z
      .string()
      .max(150, 'Title must be 150 characters or less')
      .optional(),

    slug: z.string().optional(),

    content: z
      .string()
      .min(100, 'Content must be at least 100 characters')
      .optional(),

    coverImage: z.string().optional(), // Optional cover image

    author: z.string().optional(),

    tags: z
      .array(z.string().max(30, 'Tag must be 30 characters or less'))
      .optional(),

    category: z.string().optional(),

    likes: z.number().int().min(0).optional(),

    comments: z.array(z.string()).optional(),

    publishedAt: z.string().optional(),

    status: z.enum(['draft', 'published', 'archived']).default('draft'),
  }),
});

// Exporting the Zod schema
export const BlogValidationSchema = {
  BlogSchema,
  UpdateBlogSchema,
};
