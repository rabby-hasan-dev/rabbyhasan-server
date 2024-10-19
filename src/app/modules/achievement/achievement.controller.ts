import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import AppError from '../../errors/AppError';
import { TImageFiles } from '../../interface/image.interface';
import { AchievementsServices } from './achievement.service';


const createAchievement = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Please upload an image!');
  }


  const AchievementData = req.body;
  const files = req.files;

  const result = await AchievementsServices.CreateAchievementIntoDB(
    AchievementData,
    files as TImageFiles,
  );


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievement Create succesfully',
    data: result,
  });
});



const getSingleAchievement = catchAsync(async (req, res) => {
  const { AchievementId } = req.params;
  const result = await AchievementsServices.getSingleAchievementFromDB(AchievementId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievement is retrieved succesfully',
    data: result,
  });
});


const getAllAchievements: RequestHandler = catchAsync(async (req, res) => {

  const result = await AchievementsServices.getAllAchievementFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievement are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAllAchievementsByAuthor: RequestHandler = catchAsync(async (req, res) => {

  const { AchievementId } = req.params;
  const result = await AchievementsServices.getAllAchievementByAuthorFromDB(AchievementId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievement are retrieved succesfully',
    data: result,
  });
});


const updateAchievement = catchAsync(async (req, res) => {
  const { AchievementId } = req.params;
  const AchievementData = req.body;
  const file = req.files;
  const result = await AchievementsServices.updateAchievementIntoDB(
    AchievementId,
    AchievementData,
    file as TImageFiles,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievement is updated succesfully',
    data: result,
  });
});


const deleteAchievement = catchAsync(async (req, res) => {
  const { AchievementId } = req.params;
  const result = await AchievementsServices.deleteAchievementFromDB(AchievementId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievement is deleted succesfully',
    data: result,
  });
});


export const AchievementControllers = {
  createAchievement,
  getAllAchievements,
  getSingleAchievement,
  deleteAchievement,
  updateAchievement,
  getAllAchievementsByAuthor
};
