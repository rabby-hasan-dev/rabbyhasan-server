import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppError';
import { CertificationServices } from './Certification.service';


const createCertifications = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Please upload an image!');
  }


  const CertificationData = req.body;
  const userId = req.user.userId;
  const result = await CertificationServices.CreateCertificationIntoDB(
    userId,
    CertificationData,

  );


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certifications Create succesfully',
    data: result,
  });
});



const getSingleCertification = catchAsync(async (req, res) => {
  const { certificationId } = req.params;
  const result = await CertificationServices.getSingleCertificationFromDB(certificationId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certifications is retrieved succesfully',
    data: result,
  });
});


const getAllCertificationss: RequestHandler = catchAsync(async (req, res) => {

  const result = await CertificationServices.getAllCertificationFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certifications are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});


const updateCertifications = catchAsync(async (req, res) => {
  const { certificationId } = req.params;
  const CertificationsData = req.body;

  const result = await CertificationServices.updateCertificationIntoDB(
    certificationId,
    CertificationsData,
  );


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certifications is updated succesfully',
    data: result,
  });
});


const deleteCertifications = catchAsync(async (req, res) => {
  const { certificationId } = req.params;
  const result = await CertificationServices.deleteCertificationFromDB(certificationId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Certifications is deleted succesfully',
    data: result,
  });
});


export const CertificationControllers = {
  createCertifications,
  getAllCertificationss,
  getSingleCertification,
  deleteCertifications,
  updateCertifications,

};
