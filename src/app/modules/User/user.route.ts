import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import { multerUpload } from '../../config/multer.config';
import { USER_ROLE } from '../../constant';

const router = express.Router();

router.get(
  '/me',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  UserControllers.getMyProfile,
);

router.put(
  '/me',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserControllers.UpdateMyProfile,
);

router.get('/:userId', UserControllers.getSingleUser);

router.get(
  '/',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  UserControllers.getAllUsers,
);

router.delete(
  '/:userId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  UserControllers.deleteUser,
);


router.post(
  '/contact',

  UserControllers.contactUser,
);

export const UsersRoutes = router;
