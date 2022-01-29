const httpStatus = require('http-status');
const { Project, Organization, Issue, Epic } = require('../models');
const ApiError = require('../utils/ApiError');

const createProject = async (projectBody) => {
  if (await Project.isNameTaken(projectBody.name, projectBody.orgId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project name already taken');
  }
  return Project.create(projectBody);
};

const getProjectsForOrganization = async (orgId) => {
  return Organization.findById(orgId)
    .populate('members')
    .populate('owner')
    .populate({
      path: 'projects',
      populate: {
        path: 'projectLead',
        select: { name: 1 },
      },
    });
};

const getProjectById = async (id) => {
  const project = await Project.findById(id).populate('members').populate('projectLead');
  const epics = await Epic.find({ projectId: id });
  const epicIds = epics.map((epic) => {
    return epic._id;
  });
  const issues = await Issue.find({ epicId: { $in: epicIds } });
  const users = project.members;
  users.push(project.projectLead);
  const result = {
    project: {
      ...project._doc,
      epics,
      issues,
      users,
    },
  };
  return result;
};

const updateProjectById = async (projectId, updateBody) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  if (await Project.isNameTaken(updateBody.name, updateBody.orgId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project name already taken');
  }
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

const deleteProjectById = async (projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  await project.remove();
  return project;
};

module.exports = {
  createProject,
  getProjectsForOrganization,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
