import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { technologyServices } from './technology.service';

const createTechnologys = catchAsync(async (req, res) => {
  const TechnologyData = req.body;


  const result =
    await technologyServices.CreateTechnologyIntoDB(TechnologyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technologys Create succesfully',
    data: result,
  });
});

const getSingleTechnology = catchAsync(async (req, res) => {
  const { technologyId } = req.params;
  const result =
    await technologyServices.getSingleTechnologyFromDB(technologyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technologys is retrieved succesfully',
    data: result,
  });
});

const getAllTechnologyss: RequestHandler = catchAsync(async (req, res) => {
  const result = await technologyServices.getAllTechnologyFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technologys are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAllTechnologyByType: RequestHandler = catchAsync(async (req, res) => {
  const { type } = req.params;

  const result = await technologyServices.getAllTechnologyByTypeFromDB(type);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technologys are retrieved By Type succesfully',
    data: result,
  });
});

const updateTechnologys = catchAsync(async (req, res) => {
  const { technologyId } = req.params;
  const TechnologysData = req.body;

  const result = await technologyServices.updateTechnologyIntoDB(
    technologyId,
    TechnologysData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technologys is updated succesfully',
    data: result,
  });
});

const deleteTechnologys = catchAsync(async (req, res) => {
  const { technologyId } = req.params;
  const result = await technologyServices.deleteTechnologyFromDB(technologyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technologys is deleted succesfully',
    data: result,
  });
});

export const technologyControllers = {
  createTechnologys,
  getAllTechnologyss,
  getSingleTechnology,
  deleteTechnologys,
  updateTechnologys,
  getAllTechnologyByType,
};
