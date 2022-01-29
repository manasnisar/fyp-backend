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
  // res.send({
  //   project: {
  //     id: 62131,
  //     name: 'singularity 1.0',
  //     url: 'https://www.atlassian.com/software/jira',
  //     description:
  //       'Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.',
  //     category: 'software',
  //     createdAt: '2021-11-21T07:18:51.949Z',
  //     updatedAt: '2021-11-21T07:18:51.949Z',
  //     users: [
  //       {
  //         id: 187137,
  //         name: 'Pickle Rick',
  //         email: 'rick@jira.guest',
  //         avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
  //         createdAt: '2021-11-21T07:18:51.945Z',
  //         updatedAt: '2021-11-21T07:18:51.949Z',
  //         projectId: 62131,
  //       },
  //       {
  //         id: 187136,
  //         name: 'Baby Yoda',
  //         email: 'yoda@jira.guest',
  //         avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
  //         createdAt: '2021-11-21T07:18:51.938Z',
  //         updatedAt: '2021-11-21T07:18:51.949Z',
  //         projectId: 62131,
  //       },
  //       {
  //         id: 187135,
  //         name: 'Lord Gaben',
  //         email: 'gaben@jira.guest',
  //         avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
  //         createdAt: '2021-11-21T07:18:51.936Z',
  //         updatedAt: '2021-11-21T07:18:51.949Z',
  //         projectId: 62131,
  //       },
  //     ],
  //     issues: [
  //       {
  //         id: 502841,
  //         title: "Click on an issue to see what's behind it.",
  //         type: 'task',
  //         status: 'blocked',
  //         priority: '2',
  //         createdAt: '2021-11-21T07:18:51.958Z',
  //         updatedAt: '2021-11-21T07:18:51.958Z',
  //         userIds: [187137],
  //       },
  //       {
  //         id: 502842,
  //         title: 'Try dragging issues to different columns to transition their status.',
  //         type: 'story',
  //         status: 'blocked',
  //         priority: '3',
  //         createdAt: '2021-11-21T07:18:51.958Z',
  //         updatedAt: '2021-11-21T07:18:51.958Z',
  //         userIds: [],
  //       },
  //       {
  //         id: 502843,
  //         title: 'Each issue can be assigned priority from lowest to highest.',
  //         type: 'task',
  //         status: 'ready',
  //         priority: '5',
  //         createdAt: '2021-11-21T07:18:51.974Z',
  //         updatedAt: '2021-11-21T07:18:51.974Z',
  //         userIds: [],
  //       },
  //       {
  //         id: 502844,
  //         title: 'You can use rich text with images in issue descriptions.',
  //         type: 'story',
  //         status: 'blocked',
  //         priority: '1',
  //         createdAt: '2021-11-21T07:18:51.974Z',
  //         updatedAt: '2021-11-21T07:18:51.974Z',
  //         userIds: [187135],
  //       },
  //       {
  //         id: 502845,
  //         title: 'Each issue has a single reporter but can have multiple assignees.',
  //         type: 'task',
  //         status: 'inQa',
  //         priority: '4',
  //         createdAt: '2021-11-21T07:18:51.984Z',
  //         updatedAt: '2021-11-21T07:19:40.935Z',
  //         userIds: [187137],
  //       },
  //       {
  //         id: 502846,
  //         title: 'Try leaving a comment on this issue.',
  //         type: 'task',
  //         status: 'done',
  //         priority: '3',
  //         createdAt: '2021-11-21T07:18:51.988Z',
  //         updatedAt: '2021-11-21T07:18:51.988Z',
  //         userIds: [187136],
  //       },
  //       {
  //         id: 502847,
  //         title: 'You can track how many hours were spent working on an issue, and how many hours remain.',
  //         type: 'task',
  //         status: 'inProgress',
  //         priority: '1',
  //         createdAt: '2021-11-21T07:18:51.991Z',
  //         updatedAt: '2021-11-21T07:18:51.991Z',
  //         userIds: [],
  //       },
  //       {
  //         id: 507847,
  //         title: 'You can track how many hours were spent working on an issue, and how many hours remain.',
  //         type: 'task',
  //         status: 'unplanned',
  //         priority: '1',
  //         createdAt: '2021-11-21T07:18:51.991Z',
  //         updatedAt: '2021-11-21T07:18:51.991Z',
  //         userIds: [],
  //       },
  //       {
  //         id: 508847,
  //         title: 'You can track how many hours were spent working on an issue, and how many hours remain.',
  //         type: 'task',
  //         status: 'planned',
  //         priority: '1',
  //         createdAt: '2021-11-21T07:18:51.991Z',
  //         updatedAt: '2021-11-21T07:18:51.991Z',
  //         userIds: [],
  //       },
  //       {
  //         id: 502844,
  //         title: 'You can use rich text with images in issue descriptions.',
  //         type: 'story',
  //         status: 'unplanned',
  //         priority: '1',
  //         createdAt: '2021-11-21T07:18:51.974Z',
  //         updatedAt: '2021-11-21T07:18:51.974Z',
  //         userIds: [187135],
  //       },
  //       {
  //         id: 502845,
  //         title: 'Each issue has a single reporter but can have multiple assignees.',
  //         type: 'task',
  //         status: 'unplanned',
  //         priority: '4',
  //         createdAt: '2021-11-21T07:18:51.984Z',
  //         updatedAt: '2021-11-21T07:19:40.935Z',
  //         userIds: [187137],
  //       },
  //       {
  //         id: 502846,
  //         title: 'Try leaving a comment on this issue.',
  //         type: 'task',
  //         status: 'ready',
  //         priority: '3',
  //         createdAt: '2021-11-21T07:18:51.988Z',
  //         updatedAt: '2021-11-21T07:18:51.988Z',
  //         userIds: [187136],
  //       },
  //       {
  //         id: 502847,
  //         title: 'You can track how many hours were spent working on an issue, and how many hours remain.',
  //         type: 'task',
  //         status: 'ready',
  //         priority: '1',
  //         createdAt: '2021-11-21T07:18:51.991Z',
  //         updatedAt: '2021-11-21T07:18:51.991Z',
  //         userIds: [],
  //       },
  //     ],
  //   },
  // });


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
