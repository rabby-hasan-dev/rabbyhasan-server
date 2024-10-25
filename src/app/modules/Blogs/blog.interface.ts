import { Model, Types } from 'mongoose';

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  coverImage?: string[]; // Optional field for the cover image
  author: Types.ObjectId; // Reference to the User model
  tags: string[]; // Array of strings representing tags
  category: string; // Blog category
  likes: number; // Number of likes
  comments: Types.ObjectId[]; // Array of references to the Comment model
  publishedAt?: Date; // Optional field for the publish date
  status: 'draft' | 'published' | 'archived'; // Enum for the post status
  isDeleted: boolean;
}

export interface BlogModel extends Model<IBlog> {
  // eslint-disable-next-line no-unused-vars
  isBlogExists(id: string): Promise<IBlog | null>;
}
