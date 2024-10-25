import { z } from 'zod';

// Define Project Zod Schema
const ProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'), // Required string
    description: z.string().min(1, 'Description is required'), // Required string
    technologies: z.array(z.string()).optional(), // Optional array of technology ObjectId strings
    githubRepoClient: z
      .string()
      .url('Invalid URL for GitHub client repository')
      .min(1, 'GitHub client repository is required'), // Required string with URL validation
    githubRepoServer: z
      .string()
      .url('Invalid URL for GitHub server repository')
      .min(1, 'GitHub server repository is required'), // Required string with URL validation
    liveDemo: z.string().url().optional(), // Optional URL for live demo
    category: z
      .enum(['Web Development', 'Mobile Development', 'Data Science', 'Other'])
      .default('Web Development'), // Enum for predefined categories
    author: z.string().optional(), // Optional ObjectId (User)
    client: z.string().optional(), // Optional ObjectId (Client)
    startDate: z.string({ required_error: 'Start date is required' }), // Required date
    endDate: z.string().optional(), // Optional date
    tags: z.string().optional(), // Optional array of custom tags
    projectType: z.enum(['Full Stack', 'Front End', 'Back End', 'Rest Api']),
    testimonials: z.array(z.string()).optional(), // Optional array of ObjectId (Testimonials)
    views: z.number().default(0), // Default number value for views
    collaborators: z.array(z.string()).optional(), // Optional array of ObjectId (User) for collaborators
  }),
});

const UpdateProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    technologies: z.array(z.string()).optional(),
    githubRepoClient: z
      .string()
      .url('Invalid URL for GitHub client repository')
      .min(1, 'GitHub client repository is required')
      .optional(),
    githubRepoServer: z
      .string()
      .url('Invalid URL for GitHub server repository')
      .min(1, 'GitHub server repository is required')
      .optional(),
    liveDemo: z.string().url().optional(),
    category: z
      .enum(['Web Development', 'Mobile Development', 'Data Science', 'Other'])
      .optional(),
    author: z.string().optional(),
    client: z.string().optional(),
    startDate: z
      .string({ required_error: 'Start date is required' })
      .optional(),
    endDate: z.string().optional(),
    tags: z.string().optional(),
    projectType: z
      .string({ required_error: 'Project Type is required' })
      .optional(),
    testimonials: z.array(z.string()).optional(),
    views: z.number().optional(),
    collaborators: z.array(z.string()).optional(),
  }),
});

// Exporting the Zod schema
export const projectValidationSchema = {
  ProjectSchema,
  UpdateProjectSchema,
};
