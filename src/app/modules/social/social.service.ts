import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import { Comment, Rating, Vote } from './social.model';

import mongoose from 'mongoose';
import { User } from '../User/user.model';
import { validateRating } from './social.utils';
import { Project } from '../projects/projects.model';


// -------------- Rate Projectsection ---------

// Submit or update a rating, then calculate and update the project's average rating
const rateAndCalculateAverage = async (
  currentUserId: string,
  projectId: string,
  ratingValue: number,
) => {
  validateRating(ratingValue);

  const userExists = await User.isUserExists(currentUserId);
  const projectExists = await Project.isProjectExists(projectId);
  if (!userExists || !projectExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'One or both project and users not found',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const existingRating = await Rating.findOne({
      projectId,
      userId: currentUserId,
    });

    if (existingRating) {
      existingRating.rating = ratingValue;
      await existingRating.save({ session });
    } else {
      await Rating.create(
        [{ projectId, userId: currentUserId, rating: ratingValue }],
        { session },
      );
      // await Project.findByIdAndUpdate(projectId, { $push: { ratings: newRating._id } }, { session });
    }

    // Aggregate to update the average rating and total rating count
    const ratingsData = await Rating.aggregate([
      { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
        },
      },
    ]).session(session);

    const averageRating = ratingsData[0]?.averageRating || 0;
    const totalRatings = ratingsData[0]?.totalRatings || 0;

    await Project.findByIdAndUpdate(
      projectId,
      { averageRating, totalRatings },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return {
      averageRating,
      totalRatings,
      message: 'Rating submitted successfully!',
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to submit rating!',
    );
  }
};

const getProjectRatingsFromDB = async (projectId: string) => {
  const ratings = await Rating.find({ projectId })
    .populate('userId')
    .populate('projectId');
  return ratings;
};

// -------------- Comment Projectsection ---------
const postProjectCommentIntoDB = async (
  currentUserId: string,
  projectId: string,
  comment: any,
) => {
  const userExists = await User.isUserExists(currentUserId);

  if (!userExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found!');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newComment = { projectId, userId: currentUserId, comment };
    const savedComment = await Comment.create([newComment], { session });

    // Check if the Project exists
    const project = await Project.findById(projectId).session(session); // Ensure session is used for the query
    if (!project) {
      throw new AppError(httpStatus.NOT_FOUND, 'Project not found!');
    }

    // Update the Project with the new comment and increment the commentCount
    await Project.findByIdAndUpdate(
      projectId,
      {
        // $push: { comments: savedComment[0]._id },
        $inc: { totalComment: 1 }, // Increment the totalcomment
      },
      { new: true, session },
    );

    await session.commitTransaction();
    session.endSession();

    return savedComment;

    // @ts-nocheck
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to submit comment!',
    );
  }
};

const getProjectCommentFromDB = async (projectId: string) => {
  return await Comment.find({ projectId })
    .populate('userId')
    .populate('projectId')
    .sort({ createdAt: -1 });
};

const editProjectCommentFromDB = async (
  userId: string,
  commentId: string,
  content: any,
) => {
  const comment = await Comment.findOne({ _id: commentId, userId });

  if (!comment) {
    throw new Error(
      'Comment not found or you are not authorized to edit this comment',
    );
  }
  const updateComment = await Comment.findByIdAndUpdate(
    commentId,
    { comment: content },
    { new: true },
  );

  return updateComment;
};

const deleteProjectCommentFromDB = async (
  projectId: string,
  commentId: string,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteComment = await Comment.findByIdAndDelete(commentId, {
      session,
    });

    // Check if the Project exists
    const project = await Project.findById(projectId).session(session); // Ensure session is used for the query
    if (!project) {
      throw new AppError(httpStatus.NOT_FOUND, 'Project not found!');
    }

    await Project.findByIdAndUpdate(
      projectId,
      {
        // $pull: { comments: commentId },
        $inc: { totalComment: -1 }, //  decrement total comment count
      },
      { session },
    );

    await session.commitTransaction();
    session.endSession();
    return deleteComment;
    // @ts-nocheck
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to submit comment deletion!',
    );
  }
};

// -------------- Vote Projectsection ---------

const toggleVote = async (
  projectId: string,
  userId: string,
  type: 'upvote' | 'downvote',
) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists)
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found!');

  const project = await Project.findById(projectId);
  if (!project) throw new AppError(httpStatus.NOT_FOUND, 'Project not found!');

  // Find or create vote
  let vote = await Vote.findOne({ user: userId, projectId });

  if (vote) {
    if (
      (type === 'upvote' && vote.value === 1) ||
      (type === 'downvote' && vote.value === -1)
    ) {
      // Remove vote (unvote)
      await Vote.deleteOne({ user: userId, projectId });
      type === 'upvote' ? project.upvote-- : project.downvote--;
      await project.save();
      return { message: `${type} removed` };
    } else {
      // Switch vote
      vote.value = type === 'upvote' ? 1 : -1;
      await vote.save();
      project[type === 'upvote' ? 'upvote' : 'downvote']++;
      project[type === 'downvote' ? 'upvote' : 'downvote']--;
      await project.save();
      return { message: `${type} toggled` };
    }
  } else {
    // Create a new vote
    vote = new Vote({
      user: userId,
      projectId,
      value: type === 'upvote' ? 1 : -1,
    });
    await vote.save();
    type === 'upvote' ? project.upvote++ : project.downvote++;
    await project.save();
    return { message: `${type} added` };
  }
};

export const SocailConectivityServices = {
  rateAndCalculateAverage,
  getProjectRatingsFromDB,
  postProjectCommentIntoDB,
  getProjectCommentFromDB,
  editProjectCommentFromDB,
  deleteProjectCommentFromDB,
  toggleVote,
};
