import { Model, Types } from 'mongoose';

export interface IProject {
  title: string;
  description: string;
  technologies: string[];
  githubRepo: string;
  liveDemo?: string;
  author: Types.ObjectId;
  images?: string[];
  client?: Types.ObjectId;  // Reference to Client model
  startDate: Date;
  endDate?: Date;
  tags: string[];
  isFeatured: boolean;
  isDeleted: boolean
}

export interface ProjectModel extends Model<IProject> {
  isProjectExists(id: string): Promise<IProject | null>;
}
