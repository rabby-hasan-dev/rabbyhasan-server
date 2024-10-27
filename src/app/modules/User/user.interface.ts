/* eslint-disable no-unused-vars */

import { Model, Types } from 'mongoose';
import { USER_ROLE } from '../../constant';

export enum UserRoleEnum {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserStatusEnum {
  ACTIVE = 'active',
  IN_PROGRESS = 'in-progress',
  BLOCKED = 'blocked',
}

export type TUserName = {
  firstName: string;
  lastName: string;
};

type TSocialLink = {
  platform: string;
  url: string;
};

export interface IContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}



export interface TUser {
  _id?: Types.ObjectId | string;
  name?: TUserName;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: UserRoleEnum;
  isVerified: boolean;
  status: string;
  profilePicture: string;
  bio: string;
  phone: string;
  address: string;
  socialLinks: TSocialLink[];
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser>;
  isUserExistsByEmail(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
