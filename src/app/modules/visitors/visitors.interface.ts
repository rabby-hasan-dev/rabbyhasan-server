import { Model } from 'mongoose';

// Define Visitor Interface
export interface IVisitor {
  ip: string;
  city?: string;
  country?: string;
  region?: string;
  location?: string;
  date?: Date;
  isDeleted: boolean;
}

export interface VisitorModel extends Model<IVisitor> {
  // eslint-disable-next-line no-unused-vars
  isVisitorExists(id: string): Promise<IVisitor | null>;
}
