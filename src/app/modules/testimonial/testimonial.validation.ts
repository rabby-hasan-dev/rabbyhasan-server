import { z } from 'zod';

// Define Testimonial Zod Schema
const TestimonialSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'), // Required string
    position: z.string().min(1, 'Position is required'), // Required string
    company: z.string().optional(), // Optional string for company
    message: z.string().min(1, 'Message is required'), // Required string
  }),
});

// Define Testimonial Zod Schema
const UpdateTestimonialSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    position: z.string().min(1, 'Position is required').optional(),
    company: z.string().optional(),
    message: z.string().min(1, 'Message is required').optional(),
  }),
});

// Exporting the Zod schema
export const testimonialValidationSchema = {
  TestimonialSchema,
  UpdateTestimonialSchema,
};
