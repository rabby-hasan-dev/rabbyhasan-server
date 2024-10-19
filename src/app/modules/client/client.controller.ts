import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClientServices } from './client.service';




const createClient = catchAsync(async (req, res) => {

  const ClientData = req.body;

  const result = await ClientServices.CreateClientIntoDB(ClientData,);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client Create succesfully',
    data: result,
  });
});



const getSingleClient = catchAsync(async (req, res) => {
  const { clientId } = req.params;
  const result = await ClientServices.getSingleClientFromDB(clientId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client is retrieved succesfully',
    data: result,
  });
});


const getAllClients: RequestHandler = catchAsync(async (req, res) => {

  const result = await ClientServices.getAllClientFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});


const updateClient = catchAsync(async (req, res) => {
  const { clientId } = req.params;
  const ClientData = req.body;

  const result = await ClientServices.updateClientIntoDB(
    clientId,
    ClientData,
  );


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client is updated succesfully',
    data: result,
  });
});


const deleteClient = catchAsync(async (req, res) => {


  const { clientId } = req.params;

  const result = await ClientServices.deleteClientFromDB(clientId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client is deleted succesfully',
    data: result,
  });
});


export const ClientControllers = {
  createClient,
  getAllClients,
  getSingleClient,
  deleteClient,
  updateClient,

};
