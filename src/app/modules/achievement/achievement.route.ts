import express from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyparser';
import { AchievementControllers } from './achievement.controller';


const router = express.Router();

router.post(
  '/',
  // auth(USER_ROLE.user),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,

  AchievementControllers.createAchievement,
);
router.get('/',
  // auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  AchievementControllers.getAllAchievements);

router.get(
  '/:projectId',

  AchievementControllers.getSingleAchievement,
);

router.get(
  '/author/:userId',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  AchievementControllers.getAllAchievementsByAuthor,
);

router.put(
  '/:projectId',
  // auth(USER_ROLE.user, USER_ROLE.admin),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  AchievementControllers.updateAchievement,
);
router.delete(
  '/:projectId',
  // auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  AchievementControllers.deleteAchievement,
);


export const AchievementRoutes = router;
