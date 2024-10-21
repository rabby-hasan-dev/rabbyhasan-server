import { Types } from 'mongoose';

export interface IRating {
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  rating: number;
}

export interface IComment {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  comment: string;
}

export interface IVote {
  user: Types.ObjectId;
  projectId: Types.ObjectId;
  value: number;
}
