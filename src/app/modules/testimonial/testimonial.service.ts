import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TImageFiles } from '../../interface/image.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Testimonial } from './testimonial.model';
import { ITestimonial } from './testimonial.interface';
import { TestimonialSearchableFields } from './testimonial.constant';


const getAllTestimonialFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(Testimonial.find().populate('author'), query)
    .search(TestimonialSearchableFields)
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


const CreateTestimonialIntoDB = async (
  userId: string,
  payload: ITestimonial,
  files: TImageFiles,
) => {

  const authorId = new mongoose.Types.ObjectId(userId);
  const { file } = files;
  const TestimonialData: ITestimonial = {
    ...payload,
    author: authorId,
    images: file.map((image) => image.path),
  };

  const result = await Testimonial.create(TestimonialData);

  return result;
};


const getSingleTestimonialFromDB = async (id: string) => {

  const result = await Testimonial.findById(id);
  return result;
};

const getAllTestimonialByAuthorFromDB = async (id: string) => {
  const result = await Testimonial.find({ author: id, isDeleted: false }).populate('author');
  return result;
};

const updateTestimonialIntoDB = async (
  id: string,
  payload: Partial<ITestimonial>,
  files: TImageFiles,
) => {
  const { file } = files;

  if (files.length) {
    payload.images = file.map((image) => image.path);
  }

  const result = await Testimonial.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteTestimonialFromDB = async (id: string) => {

  const isTestimonialExists = await Testimonial.isTestimonialExists(id)
  if (!isTestimonialExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Testimonial not found!')
  }
  const result = await Testimonial.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const TestimonialsServices = {
  CreateTestimonialIntoDB,
  getAllTestimonialFromDB,
  getSingleTestimonialFromDB,
  updateTestimonialIntoDB,
  deleteTestimonialFromDB,
  getAllTestimonialByAuthorFromDB
};
