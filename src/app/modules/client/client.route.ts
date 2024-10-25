import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { ClientControllers } from './client.controller';
import validateRequest from '../../middlewares/validateRequest';
import { clientValidationSchema } from './client.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(clientValidationSchema.ClientSchema),
  ClientControllers.createClient,
);
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  ClientControllers.getAllClients,
);

router.get(
  '/:clientId',

  ClientControllers.getSingleClient,
);

router.put(
  '/:clientId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(clientValidationSchema.UpdateClientSchema),
  ClientControllers.updateClient,
);

router.delete(
  '/:clientId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  ClientControllers.deleteClient,
);

export const clientRoutes = router;
