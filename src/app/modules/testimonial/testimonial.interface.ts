import { Model, Types } from 'mongoose';

// Define Testimonial Interface
export interface ITestimonial extends Document {
  name: string;  // Name of the person giving the testimonial
  position: string;  // Position of the person (e.g., CEO, Developer)
  company?: string;  // Optional, company name of the person
  message: string;  // The testimonial message
  imageUrl?: string;  // Optional, picture of the person giving the testimonial
  isDeleted: Boolean;
}

export interface TestimonialModel extends Model<ITestimonial> {
  isTestimonialExists(id: string): Promise<ITestimonial | null>;
}
