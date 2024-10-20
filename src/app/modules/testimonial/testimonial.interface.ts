import { Model } from 'mongoose';

// Define Testimonial Interface
export interface ITestimonial {
  name: string;  // Name of the person giving the testimonial
  position: string;  // Position of the person (e.g., CEO, Developer)
  company?: string;  // Optional, company name of the person
  message: string;  // The testimonial message
  images?: string[];  // Optional, picture of the person giving the testimonial
  isDeleted: boolean;
}



export interface TestimonialModel extends Model<ITestimonial> {
  isTestimonialExists(id: string): Promise<ITestimonial | null>;
}
