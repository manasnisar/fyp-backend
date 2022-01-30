const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');
const { addProjectToOrgById } = require('../services/organization.service');
const ApiError = require('../utils/ApiError');

const createProject = catchAsync(async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    await addProjectToOrgById({
      orgId: req.params.orgId,
      project: project._id,
    });
    res.status(httpStatus.CREATED).send(project);
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`${e.message}!`);
  }
});

const getProjectsForOrganization = catchAsync(async (req, res) => {
  const result = await projectService.getProjectsForOrganization(req.params.orgId);
  res.send(result);
});

const getProjectById = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);
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
