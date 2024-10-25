import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TImageFiles } from '../../interface/image.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Blog } from './blog.model';
import { IBlog } from './blog.interface';
import { BlogSearchableFields } from './blog.constant';

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(
    Blog.find().populate('author').populate('comments'),
    query,
  )
    .search(BlogSearchableFields)
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

const CreateBlogIntoDB = async (
  userId: string,
  payload: IBlog,
  files: TImageFiles,
) => {
  const authorId = new mongoose.Types.ObjectId(userId);
  const { file } = files;

  const BlogData: IBlog = {
    ...payload,
    author: authorId,
    coverImage: file.map((image) => image.path),
  };

  const result = await Blog.create(BlogData);

  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id)
    .populate('comments')
    .populate('author')

    .exec();
  return result;
};

const getAllBlogByAuthorFromDB = async (id: string) => {
  const result = await Blog.find({ author: id, isDeleted: false }).populate(
    'author',
  );
  return result;
};

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<IBlog>,
  files: TImageFiles,
) => {
  const { file } = files;

  if (files.length) {
    payload.coverImage = file.map((image) => image.path);
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const isBlogExists = await Blog.isBlogExists(id);
  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  }
  const result = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const BlogsServices = {
  CreateBlogIntoDB,
  getAllBlogFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogByAuthorFromDB,
};
