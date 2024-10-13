import { Schema, model } from 'mongoose';
import { IProject, ProjectModel } from './projects.interface';


const ProjectSchema = new Schema<IProject, ProjectModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    githubRepo: { type: String, required: true },
    liveDemo: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    images: [{
      type: String,
      required: [true, 'Image is required'],
    }],
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  },
);


// Query Middleware
ProjectSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProjectSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProjectSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
ProjectSchema.statics.isRecipeExists = async function (id: string) {
  const existingProject = await Project.findById(id);
  return existingProject;
};

export const Project = model<IProject, ProjectModel>('Project', ProjectSchema);
