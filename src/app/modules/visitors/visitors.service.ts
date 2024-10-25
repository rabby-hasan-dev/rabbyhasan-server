import { Visitor } from './visitors.model';
import { IVisitor } from './visitors.interface';

const getAllVisitorFromDB = async () => {
  const result = await Visitor.find({});
  return result;
};

const CreateVisitorIntoDB = async (payload: IVisitor) => {
  const result = await Visitor.create(payload);
  return result;
};

export const VisitorServices = {
  CreateVisitorIntoDB,
  getAllVisitorFromDB,
};
