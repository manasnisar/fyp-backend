const httpStatus = require('http-status');
const { Epic } = require('../models');
const ApiError = require('../utils/ApiError');

const createEpic = async (epicBody) => {
  if (await Epic.isNameTaken(epicBody.name, epicBody, projectId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Epic name already taken');
  }
  return Epic.create(epicBody);
};

const getEpicsForProject = async (projectId) => {
  const epics = await Epic.find({ projectId });
  return epics;
};

const getEpicById = async (id) => {
  return Epic.findById(id);
};

const updateEpicById = async (epicId, updateBody) => {
  const epic = await getEpicById(epicId);
  if (!epic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Epic not found');
  }
  if (await Epic.isNameTaken(updateBody.name, updateBody, projectId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Epic name already taken');
  }
  Object.assign(epic, updateBody);
  await epic.save();
  return epic;
};

const deleteEpicById = async (epicId) => {
  const epic = await getEpicById(epicId);
  if (!epic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Epic not found');
  }
  await epic.remove();
  return epic;
};

module.exports = {
  createEpic,
  getEpicsForProject,
  getEpicById,
  updateEpicById,
  deleteEpicById,
};
