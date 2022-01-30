const httpStatus = require('http-status');
const { Issue } = require('../models');
const ApiError = require('../utils/ApiError');

const createIssue = async (epicBody) => {
  return Issue.create(epicBody);
};

const getIssuesForEpic = async (epicId) => {
  const issue = await Issue.find({ epicId });
  return issue;
};

const getIssueById = async (id) => {
  return Issue.findById(id).populate('comments').populate('assignee').populate('reporter');
};

const updateIssueById = async (issueId, updateBody) => {
  const issue = Issue.findOneAndUpdate({ _id: issueId }, updateBody, { new: true, useFindAndModify: true });
  return issue;
};

const deleteIssueById = async (epicId) => {
  const epic = await getIssueById(epicId);
  if (!epic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Issue not found');
  }
  await epic.remove();
  return epic;
};

module.exports = {
  createIssue,
  getIssuesForEpic,
  getIssueById,
  updateIssueById,
  deleteIssueById,
};
