import { z } from 'zod';

// Define Certification Zod Schema
const CertificationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'), // Required string
    issuingOrganization: z.string().min(1, 'Issuing organization is required'), // Required string
    issueDate: z.string({ required_error: 'Issue date is required' }), // Required date
    expirationDate: z.string().optional(), // Optional date
  }),
});

const UpdateCertificationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    issuingOrganization: z
      .string()
      .min(1, 'Issuing organization is required')
      .optional(),
    issueDate: z
      .string({ required_error: 'Issue date is required' })
      .optional(),
    expirationDate: z.string().optional(), // Optional date
  }),
});

// Exporting the Zod schema
export const certificationValidationSchema = {
  CertificationSchema,
  UpdateCertificationSchema,
};
