import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { ExperienceControllers } from './experience.controller';
import validateRequest from '../../middlewares/validateRequest';
import { experienceValidationSchema } from './experience.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validateRequest(experienceValidationSchema.ExperienceSchema),
  ExperienceControllers.createExperience,
);
router.get(
  '/',

  ExperienceControllers.getAllExperiences,
);

router.get(
  '/:experienceId',

  ExperienceControllers.getSingleExperience,
);

router.put(
  '/:experienceId',
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validateRequest(experienceValidationSchema.UpdateExperienceSchema),
  ExperienceControllers.updateExperience,
);
router.delete(
  '/:experienceId',
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  ExperienceControllers.deleteExperience,
);

export const experienceRoutes = router;
