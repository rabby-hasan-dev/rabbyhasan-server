import { Model, Types } from 'mongoose';

// Define Experience Interface
export interface IExperience {
  position: string;
  company: string;
  companyWebsite?: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  technologiesUsed: Types.ObjectId[]; // Reference to Technology model
  isDeleted: boolean;
}

export interface ExperienceModel extends Model<IExperience> {
  // eslint-disable-next-line no-unused-vars
  isExperienceExists(id: string): Promise<IExperience | null>;
}
