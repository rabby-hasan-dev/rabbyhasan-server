import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { SocailConectivityControllers } from './social.controller';

const router = express.Router();

router.post(
  '/:projectId/rating',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  SocailConectivityControllers.rateProject,
);
router.get(
  '/:projectId/ratings',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  SocailConectivityControllers.getProjectRatings,
);
router.post(
  '/:projectId/comments',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  SocailConectivityControllers.postProjectComment,
);
router.get(
  '/:projectId/comments',
  SocailConectivityControllers.getProjectComment,
);
router.put(
  '/comments/:commentId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  SocailConectivityControllers.editeProjectComment,
);
router.delete(
  '/:projectId/comments/:commentId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  SocailConectivityControllers.deleteProjectComment,
);
router.put(
  '/:projectId/votes',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  SocailConectivityControllers.toggleVoteProject,
);

export const SocailConectivityRoutes = router;
