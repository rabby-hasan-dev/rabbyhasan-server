import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { ExperienceControllers } from './experience.controller';


const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),

  ExperienceControllers.createExperience,
);
router.get('/',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  ExperienceControllers.getAllExperiences);

router.get(
  '/:experienceId',

  ExperienceControllers.getSingleExperience,
);


router.put(
  '/:experienceId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ExperienceControllers.updateExperience,
);
router.delete(
  '/:experienceId',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  ExperienceControllers.updateExperience,
);


export const experienceRoutes = router;
