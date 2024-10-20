
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Experience } from './experience.model';
import { IExperience } from './experience.interface';
import { ExperienceSearchableFields } from './experience.constant';


const getAllExperienceFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(Experience.find(), query)
    .search(ExperienceSearchableFields)
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


const CreateExperienceIntoDB = async (
  payload: IExperience,

) => {


  const result = await Experience.create(payload);

  return result;
};


const getSingleExperienceFromDB = async (id: string) => {

  const result = await Experience.findById(id);
  return result;
};



const updateExperienceIntoDB = async (
  id: string,
  payload: Partial<IExperience>,
) => {

  const result = await Experience.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};


const deleteExperienceFromDB = async (id: string) => {

  const isExperienceExists = await Experience.isExperienceExists(id)
  if (!isExperienceExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Experience not found!')
  }
  const result = await Experience.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};


export const ExperienceServices = {
  CreateExperienceIntoDB,
  getAllExperienceFromDB,
  getSingleExperienceFromDB,
  updateExperienceIntoDB,
  deleteExperienceFromDB,
};
