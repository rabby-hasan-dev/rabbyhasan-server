import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectsServices } from './projects.service';
import AppError from '../../errors/AppError';
import { TImageFiles } from '../../interface/image.interface';

const createProjects = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Please upload an image!');
  }


  const projectData = req.body;
  const files = req.files;
  const userId = req.user.userId;
  const result = await ProjectsServices.CreateProjectIntoDB(
    userId,
    projectData,
    files as TImageFiles,
  );


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects Create succesfully',
    data: result,
  });
});



const getSingleProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await ProjectsServices.getSingleProjectFromDB(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects is retrieved succesfully',
    data: result,
  });
});


const getAllProjectss: RequestHandler = catchAsync(async (req, res) => {

  const result = await ProjectsServices.getAllProjectFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAllProjectssByAuthor: RequestHandler = catchAsync(async (req, res) => {

  const { projectId } = req.params;
  const result = await ProjectsServices.getAllProjectByAuthorFromDB(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects are retrieved succesfully',
    data: result,
  });
});


const updateProjects = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const ProjectsData = req.body;
  const file = req.files;
  const result = await ProjectsServices.updateProjectIntoDB(
    projectId,
    ProjectsData,
    file as TImageFiles,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects is updated succesfully',
    data: result,
  });
});


const deleteProjects = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await ProjectsServices.deleteProjectFromDB(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects is deleted succesfully',
    data: result,
  });
});


export const ProjectsControllers = {
  createProjects,
  getAllProjectss,
  getSingleProject,
  deleteProjects,
  updateProjects,
  getAllProjectssByAuthor
};
