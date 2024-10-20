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
  auth(USER_ROLE.user),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(projectValidationSchema.ProjectSchema),
  ProjectsControllers.createProjects,
);
router.get('/',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  ProjectsControllers.getAllProjectss);

router.get(
  '/:projectId',

  ProjectsControllers.getSingleProject,
);

router.get(
  '/author/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  ProjectsControllers.getAllProjectssByAuthor,
);

router.put(
  '/:projectId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(projectValidationSchema.UpdateProjectSchema),
  ProjectsControllers.updateProjects,
);
router.delete(
  '/:projectId',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  ProjectsControllers.deleteProjects,
);


export const ProjectRoutes = router;
