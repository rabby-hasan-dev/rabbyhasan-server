import { Schema, model } from 'mongoose';
import { IVisitor, VisitorModel } from './visitors.interface';

// Define Visitor Schema
const VisitorSchema: Schema<IVisitor, VisitorModel> = new Schema<
  IVisitor,
  VisitorModel
>(
  {
    ip: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    region: { type: String },
    location: { type: String }, // Lat, Lon if needed
    date: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware
VisitorSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

VisitorSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

VisitorSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
VisitorSchema.statics.isVisitorExists = async function (id: string) {
  const existingVisitor = await Visitor.findById(id);
  return existingVisitor;
};

// Create and export the Visitor model
export const Visitor = model<IVisitor, VisitorModel>('Visitor', VisitorSchema);
