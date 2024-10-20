import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { technologyControllers } from './technology.controller';
import validateRequest from '../../middlewares/validateRequest';
import { technologyValidationSchema } from './technology.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(technologyValidationSchema.TechnologySchema),
  technologyControllers.createTechnologys,
);
router.get('/',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  technologyControllers.getAllTechnologyss);

router.get(
  '/:technologyId',

  technologyControllers.getSingleTechnology,
);


router.put(
  '/:technologyId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  technologyControllers.updateTechnologys,
);
router.delete(
  '/:technologyId',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  validateRequest(technologyValidationSchema.UpdateTechnologySchema),
  technologyControllers.deleteTechnologys,
);


export const technologyRoutes = router;
