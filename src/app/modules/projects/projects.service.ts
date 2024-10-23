import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TImageFiles } from '../../interface/image.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { projectSearchableFields } from './projects.constant';
import { Project } from './projects.model';
import { IProject } from './projects.interface';

const getAllProjectFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(Project.find()
    .populate('technologies')
    .populate('author')
    .populate('client')
    .populate('testimonials')
    .populate('collaborators')
    , query)
    .search(projectSearchableFields)
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


const CreateProjectIntoDB = async (
  userId: string,
  payload: IProject,
  files: TImageFiles,
) => {

  const authorId = new mongoose.Types.ObjectId(userId);
  const { file } = files;


  const ProjectData: IProject = {
    ...payload,
    author: authorId,
    images: file.map((image) => image.path),
  };


  const result = await Project.create(ProjectData);

  return result;
};


const getSingleProjectFromDB = async (id: string) => {

  const result = await Project.findById(id)
    .populate('technologies')
    .populate('author')
    .populate('client')
    .populate('testimonials')
    .populate('collaborators')
    .exec();
  return result;
};

const getAllProjectByAuthorFromDB = async (id: string) => {
  const result = await Project.find({ author: id, isDeleted: false }).populate('author');
  return result;
};

const updateProjectIntoDB = async (
  id: string,
  payload: Partial<IProject>,
  files: TImageFiles,
) => {
  const { file } = files;

  if (files.length) {
    payload.images = file.map((image) => image.path);
  }

  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};


const deleteProjectFromDB = async (id: string) => {

  const isProjectExists = await Project.isProjectExists(id)
  if (!isProjectExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found!')
  }
  const result = await Project.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const ProjectsServices = {
  CreateProjectIntoDB,
  getAllProjectFromDB,
  getSingleProjectFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
  getAllProjectByAuthorFromDB
};
