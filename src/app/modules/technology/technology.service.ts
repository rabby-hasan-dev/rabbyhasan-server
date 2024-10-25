import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TechnologySearchableFields } from './technology.constant';
import { Technology } from './technology.model';
import { ITechnology } from './technology.interface';

const getAllTechnologyFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(Technology.find(), query)
    .search(TechnologySearchableFields)
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

const getAllTechnologyByTypeFromDB = async (type: string) => {
  const typeByresult = await Technology.find({ type: type });

  return typeByresult;
};

const CreateTechnologyIntoDB = async (payload: ITechnology) => {
  const result = await Technology.create(payload);
  return result;
};

const getSingleTechnologyFromDB = async (id: string) => {
  const result = await Technology.findById(id);
  return result;
};

const updateTechnologyIntoDB = async (
  id: string,
  payload: Partial<ITechnology>,
) => {
  const isTechnologyExists = await Technology.isTechnologyExists(id);
  if (!isTechnologyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Technology not found!');
  }

  const result = await Technology.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteTechnologyFromDB = async (id: string) => {
  const isTechnologyExists = await Technology.isTechnologyExists(id);
  if (!isTechnologyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Technology not found!');
  }
  const result = await Technology.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const technologyServices = {
  CreateTechnologyIntoDB,
  getAllTechnologyFromDB,
  getSingleTechnologyFromDB,
  updateTechnologyIntoDB,
  deleteTechnologyFromDB,
  getAllTechnologyByTypeFromDB,
};
