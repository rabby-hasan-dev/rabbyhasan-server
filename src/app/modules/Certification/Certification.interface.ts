import { Model } from 'mongoose';

// Define Certification Interface
export interface ICertification {
  name: string; // Name of the certification (e.g., "AWS Certified Developer")
  issuingOrganization: string; // Organization that issued the certification (e.g., "Amazon Web Services")
  issueDate: Date; // Date when the certification was issued
  expirationDate?: Date; // Optional, expiration date if the certification has one
  credentialUrl?: string; // Optional, a link to the certification or credential verification
  isDeleted: boolean;
}

export interface CertificationModel extends Model<ICertification> {
  // eslint-disable-next-line no-unused-vars
  isCertificationExists(id: string): Promise<ICertification | null>;
}
