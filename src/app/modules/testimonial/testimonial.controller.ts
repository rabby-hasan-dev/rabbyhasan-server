import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import AppError from '../../errors/AppError';
import { TImageFiles } from '../../interface/image.interface';
import { TestimonialsServices } from './testimonial.service';

const createTestimonial = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Please upload an image!');
  }


  const TestimonialData = req.body;
  const files = req.files;
  const userId = req.user.userId;
  const result = await TestimonialsServices.CreateTestimonialIntoDB(
    userId,
    TestimonialData,
    files as TImageFiles,
  );


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial Create succesfully',
    data: result,
  });
});



const getSingleTestimonial = catchAsync(async (req, res) => {
  const { testimonialId } = req.params;
  const result = await TestimonialsServices.getSingleTestimonialFromDB(testimonialId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial is retrieved succesfully',
    data: result,
  });
});


const getAllTestimonials: RequestHandler = catchAsync(async (req, res) => {

  const result = await TestimonialsServices.getAllTestimonialFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAllTestimonialsByAuthor: RequestHandler = catchAsync(async (req, res) => {

  const { testimonialId } = req.params;
  const result = await TestimonialsServices.getAllTestimonialByAuthorFromDB(testimonialId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial are retrieved succesfully',
    data: result,
  });
});


const updateTestimonial = catchAsync(async (req, res) => {
  const { testimonialId } = req.params;
  const TestimonialData = req.body;
  const file = req.files;
  const result = await TestimonialsServices.updateTestimonialIntoDB(
    testimonialId,
    TestimonialData,
    file as TImageFiles,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial is updated succesfully',
    data: result,
  });
});


const deleteTestimonial = catchAsync(async (req, res) => {
  const { testimonialId } = req.params;
  const result = await TestimonialsServices.deleteTestimonialFromDB(testimonialId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial is deleted succesfully',
    data: result,
  });
});


export const TestimonialControllers = {
  createTestimonial,
  getAllTestimonials,
  getSingleTestimonial,
  deleteTestimonial,
  updateTestimonial,
  getAllTestimonialsByAuthor
};
