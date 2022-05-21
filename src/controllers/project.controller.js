const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { projectService, notificationService } = require('../services');
const { addProjectToOrgById } = require('../services/organization.service');
const ApiError = require('../utils/ApiError');
const { User } = require('../models');
const getUserFromBearerToken = require('../utils/getBearerToken');

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
  global.socketio.emit('fetch_notifications');
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
  await projectService.deleteProjectById(req.params.projectId);
  res.status(httpStatus.NO_CONTENT).send();
});

const startSprint = catchAsync(async (req, res) => {
  const project = await projectService.startSprint(req.params.projectId, req.body.noOfWeeks);
  const sender = await User.findById(getUserFromBearerToken(req));
  const projectMembers = await User.find({ projects: project._id });
  const receiver = projectMembers.map((member) => member._id).filter((userId) => !userId.equals(sender._id));
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < receiver.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await notificationService.createNotification({
      sender: sender._id,
      receiver: receiver[i],
      read: false,
      type: 'started_sprint',
      project: project._id,
      message: `Sprint for project ${project.name} has been started by ${sender.name}`,
    });
  }
  global.socketio.emit('fetch_notifications');
  res.sendStatus(200);
});

const endSprint = catchAsync(async (req, res) => {
  const project = await projectService.endSprint(req.params.projectId);
  const sender = await User.findById(getUserFromBearerToken(req));
  const projectMembers = await User.find({ projects: project._id });
  const receiver = projectMembers.map((member) => member._id).filter((userId) => !userId.equals(sender._id));
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < receiver.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await notificationService.createNotification({
      sender: sender._id,
      receiver: receiver[i],
      read: false,
      type: 'ended_sprint',
      project: project._id,
      message: `Sprint for project ${project.name} has been ended by ${sender.name}`,
    });
  }
  global.socketio.emit('fetch_notifications');
  res.sendStatus(200);
});

module.exports = {
  createProject,
  getProjectsForUser,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  inviteMemberToProject,
  startSprint,
  endSprint,
};
