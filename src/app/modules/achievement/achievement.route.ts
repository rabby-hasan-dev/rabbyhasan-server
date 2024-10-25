import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyparser';
import { AchievementControllers } from './achievement.controller';
import { achievementValidationSchema } from './achievement.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(achievementValidationSchema.AchievementSchema),
  AchievementControllers.createAchievement,
);
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  AchievementControllers.getAllAchievements,
);

router.get(
  '/:projectId',

  AchievementControllers.getSingleAchievement,
);

router.get(
  '/author/:userId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  AchievementControllers.getAllAchievementsByAuthor,
);

router.put(
  '/:projectId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(achievementValidationSchema.UpdateAchievementSchema),
  AchievementControllers.updateAchievement,
);
router.delete(
  '/:projectId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  AchievementControllers.deleteAchievement,
);

export const AchievementRoutes = router;
