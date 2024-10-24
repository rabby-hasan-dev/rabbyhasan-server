

import { z } from 'zod';


// Define Technology Zod Schema
const TechnologySchema = z.object({
    body: z.object({
        name: z.string().trim().min(1, 'Name is required'),
        type: z.enum(['Soft Skill', 'Tech Skill']),
        description: z.string().trim().optional(),
        certifications: z.array(z.string()).optional(),
        teachers: z.array(z.string()).optional(),
        teams: z.array(z.string()).optional(),
        icon: z.string().trim().optional(),
        link: z.string().url().optional(),
        category: z.enum(['Backend', 'Frontend', 'Other']).optional(),
        projectsCompleted: z.number().nonnegative().optional(),
        projectLinks: z.array(z.string().url()).optional(),
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
