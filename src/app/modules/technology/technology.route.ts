import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { technologyControllers } from './technology.controller';
import validateRequest from '../../middlewares/validateRequest';
import { technologyValidationSchema } from './technology.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(technologyValidationSchema.TechnologySchema),
  technologyControllers.createTechnologys,
);
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  technologyControllers.getAllTechnologyss,
);

router.get('/type/:type', technologyControllers.getAllTechnologyByType);

router.get(
  '/:technologyId',

  technologyControllers.getSingleTechnology,
);

router.put(
  '/:technologyId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  technologyControllers.updateTechnologys,
);
router.delete(
  '/:technologyId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  validateRequest(technologyValidationSchema.UpdateTechnologySchema),
  technologyControllers.deleteTechnologys,
);

export const technologyRoutes = router;
