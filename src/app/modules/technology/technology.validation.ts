

import { z } from 'zod';


// Define Technology Zod Schema
const TechnologySchema = z.object({
    body: z.object({
        name: z.string().min(1, "Technology name is required"), // Required string
        category: z.string().min(1, "Category is required"), // Required string
        iconUrl: z.string().url("Invalid URL").optional(), // Optional URL for the icon
    })

});

const UpdateTechnologySchema = z.object({
    body: z.object({
        name: z.string().min(1, "Technology name is required").optional(),
        category: z.string().min(1, "Category is required").optional(),
        iconUrl: z.string().url("Invalid URL").optional(),
    })

});

// Exporting the Zod schema
export const technologyValidationSchema = {
    TechnologySchema,
    UpdateTechnologySchema
};
