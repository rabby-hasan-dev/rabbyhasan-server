import { Model, Types } from 'mongoose';



// Define Experience Interface
export interface IExperience extends Document {
  position: string;
  company: string;
  companyWebsite?: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  technologiesUsed: Types.ObjectId[];  // Reference to Technology model
  isDeleted: boolean;
}




export interface ExperienceModel extends Model<IExperience> {
  isExperienceExists(id: string): Promise<IExperience | null>;
}
