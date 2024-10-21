import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SocailConectivityServices } from './social.service';

// -------------- Rate Recpe section ---------

const rateProject = catchAsync(async (req, res) => {
  const currentUserId = req?.user?.userId;
  const { rating } = req.body;
  const { projectId } = req.params;
  const result = await SocailConectivityServices.rateAndCalculateAverage(
    currentUserId,
    projectId,
    rating,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'rate project succesfully',
    data: result,
  });
});

const getProjectRatings = catchAsync(async (req, res) => {
  const { projectId } = req.params;

  const result =
    await SocailConectivityServices.getProjectRatingsFromDB(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get project ratting succesfully',
    data: result,
  });
});

// -------------- Comment Recpe section ---------

const postProjectComment = catchAsync(async (req, res) => {
  const currentUserId = req?.user?.userId;
  const { comment } = req.body;
  const { projectId } = req.params;

  const result = await SocailConectivityServices.postProjectCommentIntoDB(
    currentUserId,
    projectId,
    comment,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post Project comment succesfully',
    data: result,
  });
});

const getProjectComment = catchAsync(async (req, res) => {
  const { projectId } = req.params;

  const result =
    await SocailConectivityServices.getProjectCommentFromDB(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Project commentg succesfully',
    data: result,
  });
});

const editeProjectComment = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { commentId } = req.params;
  const { comment } = req.body;

  const result = await SocailConectivityServices.editProjectCommentFromDB(
    userId,
    commentId,
    comment,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Edit Project comment succesfully',
    data: result,
  });
});

const deleteProjectComment = catchAsync(async (req, res) => {
  const { projectId, commentId } = req.params;

  const result = await SocailConectivityServices.deleteProjectCommentFromDB(
    projectId,
    commentId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Project comment succesfully',
    data: result,
  });
});

// -------------- Vote Recpe section ---------

const toggleVoteProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const currentUserId = req?.user?.userId;
  const voteType = req?.body?.type;

  const result = await SocailConectivityServices.toggleVote(
    projectId,
    currentUserId,
    voteType,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vote Project succesfully',
    data: result,
  });
});

export const SocailConectivityControllers = {
  rateProject,
  getProjectRatings,
  postProjectComment,
  getProjectComment,
  editeProjectComment,
  deleteProjectComment,
  toggleVoteProject,
};
