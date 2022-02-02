const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');
const { addProjectToOrgById } = require('../services/organization.service');
const ApiError = require('../utils/ApiError');
const { User } = require('../models');

const createProject = catchAsync(async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    const owner = await User.findOne({ role: 'owner', orgId: req.params.id });
    if (!owner._id.equals(project.projectLead)) {
      await User.findOneAndUpdate({ role: 'owner', orgId: req.params.id }, { $push: { projects: project._id } });
    }
    await User.findOneAndUpdate({ _id: project.projectLead }, { $push: { projects: project._id } });
    await addProjectToOrgById({
      orgId: req.params.id,
      project: project._id,
    });
    res.status(httpStatus.CREATED).send(project);
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`${e.message}!`);
  }
});

const getProjectsForUser = catchAsync(async (req, res) => {
  const result = await projectService.getProjectsForUser(req.params.id);
  res.send(result);
});

const getProjectById = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(project);
});

const inviteMemberToProject = catchAsync(async (req, res) => {
  const invitation = await projectService.inviteMember(req.body);
  res.send(invitation);
});
const updateProjectById = catchAsync(async (req, res) => {
  const project = await projectService.updateProjectById(req.params.projectId, req.body);
  res.send(project);
});

const deleteProjectById = catchAsync(async (req, res) => {
  await projectService.deleteProject(req.params.projectId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProject,
  getProjectsForUser,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  inviteMemberToProject,
};
