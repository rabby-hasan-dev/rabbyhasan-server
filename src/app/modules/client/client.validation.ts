
import { z } from 'zod';

// Define Client Zod Schema
const ClientSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"), // Required string
        website: z.string().url().optional(), // Optional URL for the website
        contactEmail: z.string().email("Invalid email format").min(1, "Contact email is required"), // Required email with validation
        projects: z.array(z.string()).optional(), // Assuming ObjectId is stored as a string; optional array
    })


});

const UpdateClientSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required").optional(), // Required string
        website: z.string().url().optional(),
        contactEmail: z.string().email("Invalid email format").min(1, "Contact email is required").optional(),
        projects: z.array(z.string()).optional(),
    })


});

// Exporting the Zod schema
export const clientValidationSchema = {
    ClientSchema,
    UpdateClientSchema
};
