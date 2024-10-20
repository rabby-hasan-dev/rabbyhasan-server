import express from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyparser';
import { ProjectsControllers } from './projects.controller';
import validateRequest from '../../middlewares/validateRequest';
import { projectValidationSchema } from './projects.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(projectValidationSchema.ProjectSchema),
  ProjectsControllers.createProjects,
);
router.get('/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  ProjectsControllers.getAllProjectss);

router.get(
  '/:projectId',

  ProjectsControllers.getSingleProject,
);

router.get(
  '/author/:userId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ProjectsControllers.getAllProjectssByAuthor,
);

router.put(
  '/:projectId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(projectValidationSchema.UpdateProjectSchema),
  ProjectsControllers.updateProjects,
);
router.delete(
  '/:projectId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  ProjectsControllers.deleteProjects,
);


export const ProjectRoutes = router;
