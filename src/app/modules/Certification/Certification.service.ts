import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { CertificationSearchableFields } from './Certification.constant';
import { Certification, } from './Certification.model';
import { ICertification } from './Certification.interface';


const getAllCertificationFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(Certification.find(), query)
    .search(CertificationSearchableFields)
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


const CreateCertificationIntoDB = async (
  userId: string,
  payload: ICertification,

) => {

  const authorId = new mongoose.Types.ObjectId(userId);

  const result = await Certification.create(payload);

  return result;
};


const getSingleCertificationFromDB = async (id: string) => {

  const result = await Certification.findById(id);
  return result;
};



const updateCertificationIntoDB = async (
  id: string,
  payload: Partial<ICertification>,
) => {

  const result = await Certification.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};


const deleteCertificationFromDB = async (id: string) => {

  const isCertificationExists = await Certification.isCertificationExists(id)
  if (!isCertificationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Certification not found!')
  }
  const result = await Certification.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};


export const CertificationServices = {
  CreateCertificationIntoDB,
  getAllCertificationFromDB,
  getSingleCertificationFromDB,
  updateCertificationIntoDB,
  deleteCertificationFromDB,
};
