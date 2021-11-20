const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');

const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.body);
  res.status(httpStatus.CREATED).send(project);
});

const getProjectsForOrganization = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ['name', 'role']);
  //   const options = pick(req.query, ['sortBy', 'limit', 'page']);
  //   const result = await projectService.getProjectsForOrganization(filter, options);
  const result = await projectService.getProjectsForOrganization(req.params.orgId);
  res.send(result);
});

const getProjectById = catchAsync(async (req, res) => {
  const project = await projectService.getProject(req.params.projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(project);
});

const updateProjectById = catchAsync(async (req, res) => {
  const project = await projectService.updateProject(req.params.projectId, req.body);
  res.send(project);
});

const deleteProjectById = catchAsync(async (req, res) => {
  await projectService.deleteProject(req.params.projectId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProject,
  getProjectsForOrganization,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
