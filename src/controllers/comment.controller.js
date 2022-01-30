const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');

const createComment = catchAsync(async (req, res) => {
  const epic = await commentService.createComment(req.body);
  res.status(httpStatus.CREATED).send(epic);
});

const updateComment = catchAsync(async (req, res) => {
  const epic = await commentService.updateComment(req.params.commentId, req.body);
  res.send(epic);
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
