import express from 'express';


import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyparser';
import { TestimonialControllers } from './testimonial.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,

  TestimonialControllers.createTestimonial,
);
router.get('/',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  TestimonialControllers.getAllTestimonials);

router.get(
  '/:testimonialId',

  TestimonialControllers.getSingleTestimonial,
);

router.get(
  '/author/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  TestimonialControllers.getAllTestimonialsByAuthor,
);

router.put(
  '/:testimonialId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  TestimonialControllers.updateTestimonial,
);
router.delete(
  '/:testimonialId',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  TestimonialControllers.deleteTestimonial,
);


export const testimonialRoutes = router;
