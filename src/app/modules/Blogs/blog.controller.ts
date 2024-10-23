import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import AppError from '../../errors/AppError';
import { TImageFiles } from '../../interface/image.interface';
import { BlogsServices } from './blog.service';

const createBlogs = catchAsync(async (req, res) => {


  if (!req.files) {
    console.log(req.files);
    throw new AppError(httpStatus.BAD_REQUEST, 'Please upload an image!');
  }


  const BlogData = req.body;
  const files = req.files;
  const userId = req.user.userId;
  const result = await BlogsServices.CreateBlogIntoDB(
    userId,
    BlogData,
    files as TImageFiles,
  );


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs Create succesfully',
    data: result,
  });
});



const getSingleBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogsServices.getSingleBlogFromDB(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs is retrieved succesfully',
    data: result,
  });
});


const getAllBlogss: RequestHandler = catchAsync(async (req, res) => {

  const result = await BlogsServices.getAllBlogFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAllBlogssByAuthor: RequestHandler = catchAsync(async (req, res) => {

  const { blogId } = req.params;
  const result = await BlogsServices.getAllBlogByAuthorFromDB(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs are retrieved succesfully',
    data: result,
  });
});


const updateBlogs = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const BlogsData = req.body;
  const file = req.files;
  const result = await BlogsServices.updateBlogIntoDB(
    blogId,
    BlogsData,
    file as TImageFiles,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs is updated succesfully',
    data: result,
  });
});


const deleteBlogs = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogsServices.deleteBlogFromDB(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs is deleted succesfully',
    data: result,
  });
});


export const BlogsControllers = {
  createBlogs,
  getAllBlogss,
  getSingleBlog,
  deleteBlogs,
  updateBlogs,
  getAllBlogssByAuthor
};
