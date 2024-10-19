import { Model, Types } from 'mongoose';

export interface IProject {
  title: string;
  description: string;
  technologies: string[];
  githubRepoClient: string;
  githubRepoServer: string;
  liveDemo?: string;
  category?: string;
  author: Types.ObjectId;
  images?: string[];
  client?: Types.ObjectId;  // Reference to Client model
  testimonials: Types.ObjectId[];
  startDate: Date;
  endDate?: Date;
  tags: string[];
  collaborators: Types.ObjectId;
  views: number;
  isFeatured: boolean;
  isDeleted: boolean
}

export interface ProjectModel extends Model<IProject> {
  isProjectExists(id: string): Promise<IProject | null>;
}
