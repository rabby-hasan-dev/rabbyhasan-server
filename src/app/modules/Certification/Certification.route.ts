import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { CertificationControllers } from './Certification.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyparser';
import validateRequest from '../../middlewares/validateRequest';
import { certificationValidationSchema } from './Certification.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(certificationValidationSchema.CertificationSchema),
  CertificationControllers.createCertifications,
);
router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  CertificationControllers.getAllCertificationss,
);

router.get(
  '/:certificationId',

  CertificationControllers.getSingleCertification,
);

router.put(
  '/:certificationId',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  multerUpload.fields([{ name: 'file' }]),
  parseBody,
  validateRequest(certificationValidationSchema.UpdateCertificationSchema),
  CertificationControllers.updateCertifications,
);
router.delete(
  '/:certificationId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  CertificationControllers.deleteCertifications,
);

export const CertificationRoutes = router;
