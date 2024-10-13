import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UsersRoutes } from '../modules/User/user.route';
import { technologyRoutes } from '../modules/technology/technology.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/technology',
    route: technologyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
