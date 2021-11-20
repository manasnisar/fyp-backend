const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { issueService } = require('../services');

const createIssue = catchAsync(async (req, res) => {
  const issue = await issueService.createIssue(req.body);
  res.status(httpStatus.CREATED).send(issue);
});

const getIssuesForEpic = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ['name', 'role']);
  //   const options = pick(req.query, ['sortBy', 'limit', 'page']);
  //   const result = await issueService.getIssuesForEpic(filter, options);
  const result = await issueService.getIssuesForEpic(req.params.epicId);
  res.send(result);
});

const getIssueById = catchAsync(async (req, res) => {
  const issue = await issueService.getIssue(req.params.issueId);
  if (!issue) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Issue not found');
  }
  res.send(issue);
});

const updateIssueById = catchAsync(async (req, res) => {
  const issue = await issueService.updateIssue(req.params.issueId, req.body);
  res.send(issue);
});

const deleteIssueById = catchAsync(async (req, res) => {
  await issueService.deleteIssue(req.params.issueId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createIssue,
  getIssuesForEpic,
  getIssueById,
  updateIssueById,
  deleteIssueById,
};
