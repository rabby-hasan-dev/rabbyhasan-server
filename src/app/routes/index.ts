import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UsersRoutes } from '../modules/User/user.route';
import { technologyRoutes } from '../modules/technology/technology.route';
import { experienceRoutes } from '../modules/experience/experience.route';
import { clientRoutes } from '../modules/client/client.route';
import { testimonialRoutes } from '../modules/testimonial/testimonial.route';
import { AchievementRoutes } from '../modules/achievement/achievement.route';
import { CertificationRoutes } from '../modules/Certification/Certification.route';
import { ProjectRoutes } from '../modules/projects/projects.route';
import { SocailConectivityRoutes } from '../modules/social/social.route';
import { BlogRoutes } from '../modules/Blogs/blog.route';

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
    path: '/projects',
    route: ProjectRoutes,
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
  {
    path: '/certification',
    route: CertificationRoutes,
  },
  {
    path: '/social',
    route: SocailConectivityRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
