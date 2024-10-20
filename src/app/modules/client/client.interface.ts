import mongoose, { Model } from 'mongoose';



// Define Client Interface
export interface IClient extends Document {
  name: string;
  website?: string;
  contactEmail: string;
  projects: mongoose.Types.ObjectId[];  // Reference to Project model
  isDeleted: boolean;

}



export interface ClientModel extends Model<IClient> {
  isClientExists(id: string): Promise<IClient | null>;
}
