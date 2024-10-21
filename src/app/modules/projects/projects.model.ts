import { Schema, model } from 'mongoose';
import { IProject, ProjectModel } from './projects.interface';


const ProjectSchema = new Schema<IProject, ProjectModel>(

  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: Schema.Types.ObjectId, ref: 'Technology' }],
    githubRepoClient: { type: String, required: true },
    githubRepoServer: { type: String, required: true },
    liveDemo: { type: String },
    category: { type: String, enum: ['Web Development', 'Mobile Development', 'Data Science', 'Other'], default: 'Web Development' }, // Enum for predefined categories
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    images: [{
      type: String,
      required: [true, 'Image is required'],
    }],
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    upvote: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 },
    tags: { type: [String], default: [] },// Custom tags for easier filtering (optional)
    isFeatured: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    testimonials: [{ type: Schema.Types.ObjectId, ref: 'Testimonials' }],
    views: { type: Number, default: 0 },  // Track the number of views for each project
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],  // List of collaborators
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
ProjectSchema.statics.isProjectExists = async function (id: string) {
  const existingProject = await Project.findById(id);
  return existingProject;
};

export const Project = model<IProject, ProjectModel>('Project', ProjectSchema);
