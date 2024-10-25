import { Model } from 'mongoose';

// Define Achievement Interface
export interface IAchievement {
  title: string; // Title of the achievement (e.g., "Best Developer Award")
  description: string; // Detailed description of the achievement
  date: Date; // The date the achievement was obtained
  imageUrl?: string[]; // Optional image or badge for the achievement
  icon: string;
  isDeleted: boolean;
}

export interface AchievementModel extends Model<IAchievement> {
  // eslint-disable-next-line no-unused-vars
  isAchievementExists(id: string): Promise<IAchievement | null>;
}
