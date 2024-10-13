import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UsersRoutes } from '../modules/User/user.route';
import { technologyRoutes } from '../modules/technology/technology.route';
import { experienceRoutes } from '../modules/experience/experience.route';
import { clientRoutes } from '../modules/client/client.route';
import { testimonialRoutes } from '../modules/testimonial/testimonial.route';
import { AchievementRoutes } from '../modules/achievement/achievement.route';

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
  {
    path: '/experience',
    route: experienceRoutes,
  },
  {
    path: '/client',
    route: clientRoutes,
  },
  {
    path: '/testimonial',
    route: testimonialRoutes,
  },
  {
    path: '/achievement',
    route: AchievementRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
