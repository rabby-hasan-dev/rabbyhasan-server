import { Model } from 'mongoose';

// Define Technology Interface
export interface ITechnology {
  name: string;
  type: 'Soft Skill' | 'Tech Skill'; // Enum for type
  description?: string; // Optional field
  certifications: string[]; // Array of certifications
  teachers: string[]; // Array of teachers
  teams: string[]; // Array of teams
  icon?: string; // Optional icon field
  link?: string; // Optional link field for tech skills
  category?: 'Backend' | 'Frontend' | 'Tools' | 'Other';
  projectsCompleted: number;
  projectLinks: string[];
  isDeleted: boolean;
}

export interface TechnologyModel extends Model<ITechnology> {
  // eslint-disable-next-line no-unused-vars
  isTechnologyExists(id: string): Promise<ITechnology | null>;
}
