
import { z } from 'zod';

// Define Achievement Zod Schema
const AchievementSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"), // Required string
        description: z.string().min(1, "Description is required"), // Required string
        date: z.string({ required_error: "Date is required" }), // Required date

    })

});

// Define Achievement Zod Schema
const UpdateAchievementSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").optional(),
        description: z.string().min(1, "Description is required").optional(),
        date: z.string({ required_error: "Date is required" }).optional(),

    })

});


export const achievementValidationSchema = {
    AchievementSchema,
    UpdateAchievementSchema
};
