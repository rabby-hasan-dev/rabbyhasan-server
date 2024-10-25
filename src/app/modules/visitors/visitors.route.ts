import express from 'express';

import { VisitorControllers } from './visitors.controller';

const router = express.Router();

router.post(
  '/',

  VisitorControllers.createVisitor,
);
router.get('/', VisitorControllers.getAllVisitors);

export const VisitorRoutes = router;
