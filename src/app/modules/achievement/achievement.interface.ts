import { Model, Types } from 'mongoose';

// Define Achievement Interface
export interface IAchievement extends Document {
  title: string;  // Title of the achievement (e.g., "Best Developer Award")
  description: string;  // Detailed description of the achievement
  date: Date;  // The date the achievement was obtained
  imageUrl?: string;  // Optional image or badge for the achievement
  isDeleted: boolean;
}

export interface AchievementModel extends Model<IAchievement> {
  isAchievementExists(id: string): Promise<IAchievement | null>;
}
