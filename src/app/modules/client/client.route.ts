import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { ClientControllers } from './client.controller';



const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),

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
  ClientControllers.updateClient,
);
router.delete(
  '/:clientId',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  ClientControllers.updateClient,
);


export const clientRoutes = router;
