import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyparser';
import { TestimonialControllers } from './testimonial.controller';
import validateRequest from '../../middlewares/validateRequest';
import { testimonialValidationSchema } from './testimonial.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(testimonialValidationSchema.TestimonialSchema),
  TestimonialControllers.createTestimonial,
);
router.get('/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  TestimonialControllers.getAllTestimonials);

router.get(
  '/:testimonialId',

  TestimonialControllers.getSingleTestimonial,
);

router.get(
  '/author/:userId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  TestimonialControllers.getAllTestimonialsByAuthor,
);

router.put(
  '/:testimonialId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(testimonialValidationSchema.UpdateTestimonialSchema),
  TestimonialControllers.updateTestimonial,
);
router.delete(
  '/:testimonialId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  TestimonialControllers.deleteTestimonial,
);


export const testimonialRoutes = router;
