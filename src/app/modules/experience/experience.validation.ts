import { z } from 'zod';

// Define Experience Zod Schema
const ExperienceSchema = z.object({
    body: z.object({
        position: z.string().min(1, "Position is required"), // Required string
        company: z.string().min(1, "Company is required"), // Required string
        companyWebsite: z.string().url().optional(), // Optional URL for company website
        startDate: z.date({ required_error: "Start date is required" }), // Required date
        endDate: z.date().optional(), // Optional date
        description: z.string().min(1, "Description is required"), // Required string
        technologiesUsed: z.array(z.string()).optional(), // Optional array of technology names, assuming ObjectId is stored as a string
    })

});

const UpdateExperienceSchema = z.object({
    body: z.object({
        position: z.string().min(1, "Position is required").optional(),
        company: z.string().min(1, "Company is required").optional(),
        companyWebsite: z.string().url().optional(),
        startDate: z.date({ required_error: "Start date is required" }).optional(),
        endDate: z.date().optional(),
        description: z.string().min(1, "Description is required").optional(),
        technologiesUsed: z.array(z.string()).optional(),
    })

});

// Exporting the Zod schema
export const experienceValidationSchema = {
    ExperienceSchema,
    UpdateExperienceSchema
};
