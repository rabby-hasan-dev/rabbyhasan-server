import { Schema, model } from 'mongoose';
import { ITechnology, TechnologyModel } from './technology.interface';


// Define Technology Schema
const TechnologySchema: Schema<ITechnology, TechnologyModel> = new Schema<ITechnology>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  iconUrl: { type: String },
  isDeleted: { type: Boolean, default: false }

}, {
  timestamps: true
});



// Query Middleware
TechnologySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

TechnologySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

TechnologySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});


//creating a custom static method
TechnologySchema.statics.isTechnologyExists = async function (id: string) {
  const existingTechnology = await Technology.findById(id);
  return existingTechnology;
};

// Create and export the Technology model
export const Technology = model<ITechnology, TechnologyModel>('Technology', TechnologySchema);