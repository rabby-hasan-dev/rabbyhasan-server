import express from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyparser';

import validateRequest from '../../middlewares/validateRequest';
import { BlogValidationSchema } from './blog.validation';
import { BlogsControllers } from './blog.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(BlogValidationSchema.BlogSchema),
  BlogsControllers.createBlogs,
);
router.get(
  '/',

  BlogsControllers.getAllBlogss,
);

router.get(
  '/:blogId',

  BlogsControllers.getSingleBlog,
);

router.get(
  '/author/:userId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BlogsControllers.getAllBlogssByAuthor,
);

router.put(
  '/:blogId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(BlogValidationSchema.UpdateBlogSchema),
  BlogsControllers.updateBlogs,
);
router.delete(
  '/:blogId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  BlogsControllers.deleteBlogs,
);

export const BlogRoutes = router;
