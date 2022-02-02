const httpStatus = require('http-status');
const { Epic, Issue } = require('../models');
const ApiError = require('../utils/ApiError');

const createEpic = async (epicBody) => {
  return Epic.create(epicBody);
};

const getEpicsForProject = async (projectId) => {
  const epics = await Epic.find({ projectId });
  return epics;
};

const getEpicById = async (id) => {
  return Epic.findById(id).populate('comments');
};

const updateEpicById = async (epicId, updateBody) => {
  return Epic.findOneAndUpdate({_id: epicId}, updateBody)
};

const deleteEpicById = async (epicId) => {
  await Issue.remove({ epicId });
  await Epic.remove({ _id: epicId });
};

module.exports = {
  createEpic,
  getEpicsForProject,
  getEpicById,
  updateEpicById,
  deleteEpicById,
};
