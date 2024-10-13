import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .max(20, 'Name cannot be more than 20 characters')
    .trim(),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .max(20, 'Name cannot be more than 20 characters')
    .trim(),
});

const userUpdateNameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .max(20, 'Name cannot be more than 20 characters')
    .trim().optional(),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .max(20, 'Name cannot be more than 20 characters')
    .trim().optional(),
});


const userValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email('Invalid email format')
      .min(1, 'Email is required')
      .trim(),
    password: z
      .string()
      .min(1, 'Password is required')
      .max(20, { message: 'Password can not be more than 20 characters' })
      .trim()
      .optional(),
  }),
});



const userUpdateValidationSchema = z.object({
  body: z.object({
    name: userUpdateNameSchema.optional(),
    bio: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});


const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['in-progress', 'active', 'blocked'] as [
      string,
      ...string[],
    ]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
  userUpdateValidationSchema,
};
