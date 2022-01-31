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
  const epic = await getEpicById(epicId);
  if (!epic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Epic not found');
  }
  if (await Epic.isNameTaken(updateBody.name, updateBody.projectId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Epic name already taken');
  }
  Object.assign(epic, updateBody);
  await Epic.save();
  return epic;
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
