import { z } from 'zod';


// Define enums
const UserRoleEnum = z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']);

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

const socialLinkSchema = z.object({
  platform: z.string().trim().min(1, 'Platform is required'),
  url: z.string().trim().url('Invalid URL format'),
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
    socialLinks: z.array(socialLinkSchema).optional(),

  })

});




export const UserValidation = {
  userValidationSchema,
  userUpdateValidationSchema,
};
