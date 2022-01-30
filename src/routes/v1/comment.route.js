const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');
const commentController = require('../../controllers/comment.controller');

const router = express.Router();

router.route('/').post(auth('createComment'), validate(commentValidation.createComment), commentController.createComment);

router
  .route('/:commentId')
  .patch(auth('manageComments'), validate(commentValidation.updateComment), commentController.updateComment)
  .delete(auth('manageEpics'), validate(commentValidation.deleteComment), commentController.deleteComment);

module.exports = router;
