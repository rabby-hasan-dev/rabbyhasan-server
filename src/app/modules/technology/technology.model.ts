import { Schema, model } from 'mongoose';
import { ITechnology, TechnologyModel } from './technology.interface';


// Define Technology Schema
const TechnologySchema: Schema<ITechnology, TechnologyModel> = new Schema<ITechnology>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['Soft Skill', 'Tech Skill'], // Differentiates between soft skills and tech skills
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  certifications: [{
    type: String, // For soft skills
  }],
  teachers: [{
    type: String, // For soft skills
  }],
  teams: [{
    type: String, // For soft skills
  }],
  icon: {
    type: String, // Store icon as a string (e.g., icon class name)
  },
  link: {
    type: String, // Link for tech skills
  },
  category: {
    type: String,
    enum: ['Backend', 'Frontend', 'Other'], // Categories for tech skills
  },
  projectsCompleted: {
    type: Number,
    default: 0,
  },
  projectLinks: [{
    type: String, // Array to hold links to projects using this technology
  }],
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