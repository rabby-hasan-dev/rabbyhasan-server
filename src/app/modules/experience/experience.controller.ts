import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { ExperienceServices } from './experience.service';

const createExperience = catchAsync(async (req, res) => {
  const ExperienceData = req.body;
  const result =
    await ExperienceServices.CreateExperienceIntoDB(ExperienceData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience Create succesfully',
    data: result,
  });
});

const getSingleExperience = catchAsync(async (req, res) => {
  const { experienceId } = req.params;
  const result =
    await ExperienceServices.getSingleExperienceFromDB(experienceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is retrieved succesfully',
    data: result,
  });
});

const getAllExperiences: RequestHandler = catchAsync(async (req, res) => {
  const result = await ExperienceServices.getAllExperienceFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateExperience = catchAsync(async (req, res) => {
  const { experienceId } = req.params;
  const ExperienceData = req.body;

  const result = await ExperienceServices.updateExperienceIntoDB(
    experienceId,
    ExperienceData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is updated succesfully',
    data: result,
  });
});

const deleteExperience = catchAsync(async (req, res) => {
  const { experienceId } = req.params;
  const result = await ExperienceServices.deleteExperienceFromDB(experienceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is deleted succesfully',
    data: result,
  });
});

export const ExperienceControllers = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  deleteExperience,
  updateExperience,
};
