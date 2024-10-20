import { z } from 'zod';


// Define enums
const UserRoleEnum = z.enum(['USER', 'ADMIN', 'SUPERADMIN']);

// Name Schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'Name cannot be more than 20 characters'),
  lastName: z
    .string()
    .trim()
    .max(20, 'Name cannot be more than 20 characters'),
});

// Main User Schema
const userValidationSchema = z.object({
  body: z.object({
    name: userNameSchema,
    email: z
      .string()
      .email('Invalid email address')
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),

    role: UserRoleEnum.default('USER'),
    status: z.string().optional(),
  })


});






// update Main User Schema
const userUpdateValidationSchema = z.object({
  body: z.object({
    name: userNameSchema.optional(),
    bio: z.string().trim().optional(),
    role: UserRoleEnum.optional(),
    status: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    projects: z.array(z.string()).optional(),
    experience: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),

  })

});




export const UserValidation = {
  userValidationSchema,
  userUpdateValidationSchema,
};
