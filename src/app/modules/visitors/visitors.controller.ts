import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VisitorServices } from './visitors.service';

const createVisitor = catchAsync(async (req, res) => {
  const VisitorData = req.body;

  const result = await VisitorServices.CreateVisitorIntoDB(VisitorData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Visitor Create succesfully',
    data: result,
  });
});

const getAllVisitors: RequestHandler = catchAsync(async (req, res) => {
  const result = await VisitorServices.getAllVisitorFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Visitor are retrieved succesfully',

    data: result,
  });
});

export const VisitorControllers = {
  createVisitor,
  getAllVisitors,
};
