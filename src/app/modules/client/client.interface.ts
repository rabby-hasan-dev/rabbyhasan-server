import mongoose, { Model } from 'mongoose';

// Define Client Interface
export interface IClient {
  name: string;
  website?: string;
  contactEmail: string;
  projects: mongoose.Types.ObjectId[]; // Reference to Project model
  isDeleted: boolean;
}

export interface ClientModel extends Model<IClient> {
  // eslint-disable-next-line no-unused-vars
  isClientExists(id: string): Promise<IClient | null>;
}
