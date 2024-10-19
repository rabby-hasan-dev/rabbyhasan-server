import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TImageFiles } from '../../interface/image.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Achievement } from './achievement.model';
import { IAchievement } from './achievement.interface';
import { AchievementSearchableFields } from './achievement.constant';



const getAllAchievementFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(Achievement.find(), query)
    .search(AchievementSearchableFields)
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


const CreateAchievementIntoDB = async (
  payload: IAchievement,
  files: TImageFiles,
) => {

  const { file } = files;



  if (files.length) {
    payload.imageUrl = file.map((image) => image.path);
  }

  const result = await Achievement.create(payload);

  return result;
};


const getSingleAchievementFromDB = async (id: string) => {

  const result = await Achievement.findById(id);
  return result;
};

const getAllAchievementByAuthorFromDB = async (id: string) => {
  const result = await Achievement.find({ author: id, isDeleted: false }).populate('author');
  return result;
};



const updateAchievementIntoDB = async (
  id: string,
  payload: Partial<IAchievement>,
  files: TImageFiles,
) => {
  const isAchievementExists = await Achievement.isAchievementExists(id)
  if (!isAchievementExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Achievement not found!')
  }
  const { file } = files;

  if (files.length) {
    payload.imageUrl = file.map((image) => image.path);
  }

  const result = await Achievement.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteAchievementFromDB = async (id: string) => {

  const isAchievementExists = await Achievement.isAchievementExists(id)
  if (!isAchievementExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Achievement not found!')
  }
  const result = await Achievement.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const AchievementsServices = {
  CreateAchievementIntoDB,
  getAllAchievementFromDB,
  getSingleAchievementFromDB,
  updateAchievementIntoDB,
  deleteAchievementFromDB,
  getAllAchievementByAuthorFromDB
};
