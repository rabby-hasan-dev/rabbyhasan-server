import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Client } from './client.model';
import { IClient } from './client.interface';
import { ClientSearchableFields } from './client.constant';

const getAllClientFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(Client.find(), query)
    .search(ClientSearchableFields)
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

const CreateClientIntoDB = async (payload: IClient) => {
  const result = await Client.create(payload);
  return result;
};

const getSingleClientFromDB = async (id: string) => {
  const result = await Client.findById(id);
  return result;
};

const updateClientIntoDB = async (id: string, payload: Partial<IClient>) => {
  const result = await Client.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteClientFromDB = async (id: string) => {
  const isClientExists = await Client.isClientExists(id);
  if (!isClientExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Client not found!');
  }
  const result = await Client.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const ClientServices = {
  CreateClientIntoDB,
  getAllClientFromDB,
  getSingleClientFromDB,
  updateClientIntoDB,
  deleteClientFromDB,
};
