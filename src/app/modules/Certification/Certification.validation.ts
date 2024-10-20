

import { z } from 'zod';

// Define Certification Zod Schema
const CertificationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"), // Required string
        issuingOrganization: z.string().min(1, "Issuing organization is required"), // Required string
        issueDate: z.date({ required_error: "Issue date is required" }), // Required date
        expirationDate: z.date().optional(), // Optional date
        credentialUrl: z.array(z.string().url()).optional(), // Optional array of URL strings
    })

});


const UpdateCertificationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required").optional(),
        issuingOrganization: z.string().min(1, "Issuing organization is required").optional(),
        issueDate: z.date({ required_error: "Issue date is required" }).optional(),
        expirationDate: z.date().optional(), // Optional date
        credentialUrl: z.array(z.string().url()).optional(),
    })

});

// Exporting the Zod schema
export const certificationValidationSchema = {
    CertificationSchema,
    UpdateCertificationSchema
};
