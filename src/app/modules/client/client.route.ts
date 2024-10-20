import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { ClientControllers } from './client.controller';
import validateRequest from '../../middlewares/validateRequest';
import { clientValidationSchema } from './client.validation';



const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(clientValidationSchema.ClientSchema),
  ClientControllers.createClient,
);
router.get('/',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  ClientControllers.getAllClients);

router.get(
  '/:clientId',

  ClientControllers.getSingleClient,
);


router.put(
  '/:clientId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(clientValidationSchema.UpdateClientSchema),
  ClientControllers.updateClient,
);


router.delete(
  '/:clientId',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  ClientControllers.deleteClient,
);


export const clientRoutes = router;
