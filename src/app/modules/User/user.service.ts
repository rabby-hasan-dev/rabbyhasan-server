/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { USER_ROLE } from '../../constant';
import { User } from './user.model';
import { JwtPayload } from 'jsonwebtoken';
import { IContactFormData, TUser } from './user.interface';
import { TImageFile } from '../../interface/image.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { sendEmail } from '../../utils/sendEmail';
import config from '../../config';
import path from 'path';
import ejs from 'ejs';


const getMyProfileIntoDB = async (email: string, role: string) => {
  let result = null;
  if (
    role === USER_ROLE.USER ||
    role === USER_ROLE.ADMIN ||
    role === USER_ROLE.SUPER_ADMIN
  ) {
    result = await User.findOne({ email: email });
  }
  return result;
};

const updateUserDataIntoDB = async (
  user: JwtPayload,
  payload: Partial<TUser>,
  file: TImageFile,
) => {
  const { userId, email } = user;
  const userExists = User.isUserExists(userId);

  if (!userExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not Authorized');
  }

  if (file?.path) {
    payload.profilePicture = file.path;
  }

  const { name, ...remainingUserData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUserData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  try {
    const result = await User.findOneAndUpdate(
      { email: email },
      modifiedUpdatedData,
      { new: true },
    );

    return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    // Catch and log any errors
  }
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const delteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await UserQuery.countTotal();
  const result = await UserQuery.modelQuery;

  return {
    meta,
    result,
  };
};



const conatactEmailWithEmailSender = async (payload: IContactFormData) => {
  const email = config.nodemailer_contact_email_address as string;
  const subject = payload.subject;

  // Render the EJS template
  const templatePath = path.join(process.cwd(), 'views', 'sendEmail.ejs');
  // Render the HTML content using EJS
  const html = await ejs.renderFile(templatePath, { ...payload });


  await sendEmail(email, subject, html);


};

export const UserServices = {
  updateUserDataIntoDB,
  getMyProfileIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  delteUserFromDB,
  conatactEmailWithEmailSender
};
