const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService, notificationService } = require('../services');
const { Issue, Epic, User } = require('../models');

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment(req.body);
  const issue = await Issue.findOneAndUpdate({ _id: comment.issueId }, { $push: { comments: comment } });
  await Epic.findOneAndUpdate({ _id: comment.issueId }, { $push: { comments: comment } });
  if (issue) {
    const sender = await User.findById(comment.userId);
    let receiver;
    receiver = [issue.reporterId, issue.assigneeId];
    if (comment.userId.equals(issue.assigneeId)) {
      receiver = [issue.reporterId];
    }
    if (comment.userId.equals(issue.reporterId)) {
      receiver = [issue.assigneeId];
    }
    await notificationService.createNotification({
      sender: comment.userId,
      receiver,
      read: false,
      type: 'added_comment',
      issue: issue._id,
      message: `A comment was added to ${issue.key} by ${sender.name} at ${comment.createdAt}`,
    });
    global.socketio.emit('fetch_notifications');
  }
  res.status(httpStatus.CREATED).send(comment);
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateComment(req.params.commentId, req.body);
  res.send(comment);
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteComment(req.params.commentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
