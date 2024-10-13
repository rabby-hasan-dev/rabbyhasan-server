import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { CertificationControllers } from './Certification.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),

  CertificationControllers.createCertifications,
);
router.get('/',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  CertificationControllers.getAllCertificationss);

router.get(
  '/:certificationId',

  CertificationControllers.getSingleCertification,
);


router.put(
  '/:certificationId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  CertificationControllers.updateCertifications,
);
router.delete(
  '/:certificationId',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  CertificationControllers.deleteCertifications,
);


export const CertificationRoutes = router;
