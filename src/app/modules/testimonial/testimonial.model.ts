import { Schema, model } from 'mongoose';
import { ITestimonial, TestimonialModel } from './testimonial.interface';



// Define Testimonial Schema
const TestimonialSchema: Schema<ITestimonial, TestimonialModel> = new Schema<ITestimonial, TestimonialModel>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String },
  message: { type: String, required: true },
  images: [{
    type: String,
    required: [true, 'Image is required'],
  }],
  isDeleted: { type: Boolean, default: false },

}, {
  timestamps: true
});


// Query Middleware
TestimonialSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

TestimonialSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

TestimonialSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
TestimonialSchema.statics.isTestimonialExists = async function (id: string) {
  const existingTestimonial = await Testimonial.findById(id);
  return existingTestimonial;
};

export const Testimonial = model<ITestimonial, TestimonialModel>('Testimonial', TestimonialSchema);
