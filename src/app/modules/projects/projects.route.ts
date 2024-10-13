import express from 'express';
import { RecipeControllers } from './projects.controller';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyparser';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,

  RecipeControllers.createRecipe,
);
router.get('/',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  RecipeControllers.getAllRecipes);

router.get(
  '/:projectId',

  RecipeControllers.getSingleRecipe,
);

router.get(
  '/author/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  RecipeControllers.getAllRecipesByAuthor,
);

router.put(
  '/:projectId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  RecipeControllers.updateRecipe,
);
router.delete(
  '/:projectId',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  RecipeControllers.deleteRecipe,
);


export const ProjectRoutes = router;
