const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const issueValidation = require('../../validations/issue.validation');
const issueController = require('../../controllers/issue.controller');

const router = express.Router();

router
  .route('/:epicId')
  .get(auth('getIssues'), validate(issueValidation.getIssuesForEpic), issueController.getIssuesForEpic)
  .post(auth('createIssue'), validate(issueValidation.createIssue), issueController.createIssue);

router
  .route('/manage/:issueId')
  .get(auth('getIssues'), issueController.getIssueById)
  .patch(auth('manageIssues'), validate(issueValidation.updateIssue), issueController.updateIssueById)
  .delete(auth('manageIssues'), validate(issueValidation.deleteIssue), issueController.deleteIssueById);

module.exports = router;
