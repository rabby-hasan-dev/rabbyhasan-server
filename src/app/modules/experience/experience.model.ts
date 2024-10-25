import { Schema, model } from 'mongoose';
import { ExperienceModel, IExperience } from './experience.interface';

// Define Experience Schema
const ExperienceSchema: Schema<IExperience, ExperienceModel> = new Schema<
  IExperience,
  ExperienceModel
>(
  {
    position: { type: String, required: true },
    company: { type: String, required: true },
    companyWebsite: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
    technologiesUsed: [{ type: Schema.Types.ObjectId, ref: 'Technology' }], // Array of technology names
    isDeleted: { type: Boolean, default: false }, // Array of technology names
  },
  {
    timestamps: true,
  },
);

// Query Middleware
ExperienceSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ExperienceSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ExperienceSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
ExperienceSchema.statics.isExperienceExists = async function (id: string) {
  const existingExperience = await Experience.findById(id);
  return existingExperience;
};

// Create and export the Experience model
export const Experience = model<IExperience, ExperienceModel>(
  'Experience',
  ExperienceSchema,
);
