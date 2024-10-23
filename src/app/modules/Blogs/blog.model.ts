import { Schema, model } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';
import { boolean } from 'zod';



const BlogSchema = new Schema<IBlog, BlogModel>(

  {
    title: {
      type: String,
      required: true,
      maxlength: 150, // Industry-standard title length
    },
    slug: {
      type: String,
      required: true,
      unique: true, // To generate SEO-friendly URLs
    },
    content: {
      type: String,
      required: true,
      minlength: 100,
    },
    coverImage: [{ type: String }],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [
      {
        type: String,
        maxlength: 30, // Industry standard to avoid overly long tags
      },
    ],
    category: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    }],
    publishedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  },
);


// Query Middleware
BlogSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

BlogSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

BlogSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
BlogSchema.statics.isBlogExists = async function (id: string) {
  const existingBlog = await Blog.findById(id);
  return existingBlog;
};

export const Blog = model<IBlog, BlogModel>('Blog', BlogSchema);
