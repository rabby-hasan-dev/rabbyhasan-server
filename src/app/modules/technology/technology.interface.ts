import { Model, Types } from 'mongoose';


// Define Technology Interface
export interface ITechnology {
  name: string;
  category: string; // E.g., "Frontend", "Backend", "DevOps"
  iconUrl?: string;
  isDeleted: boolean;

}


export interface TechnologyModel extends Model<ITechnology> {
  isTechnologyExists(id: string): Promise<ITechnology | null>;
}
