const httpStatus = require('http-status');
const { Project, Organization, Issue, Epic, Invitation, User } = require('../models');
const ApiError = require('../utils/ApiError');

const createProject = async (projectBody) => {
  if (await Project.isNameTaken(projectBody.name, projectBody.orgId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project name already taken');
  }
  return Project.create(projectBody);
};

const getProjectsForUser = async (id) => {
  const user = await User.findById(id);
  let query;
  if (user.role === 'owner') {
    query = {
      path: 'projects',
      populate: {
        path: 'projectLead',
        select: { name: 1 },
      },
    };
  } else {
    query = {
      path: 'projects',
      populate: {
        path: 'projectLead',
        select: { name: 1 },
      },
      match: { _id: { $in: user.projects } },
    };
  }
  return Organization.findById(user.orgId).populate('members').populate('owner').populate(query);
};

const getProjectById = async (id) => {
  try {
    const project = await Project.findById(id).populate('projectLead');
    const epics = await Epic.find({ projectId: id });
    const epicIds = epics.map((epic) => {
      return epic._id;
    });
    const issues = await Issue.find({ epicId: { $in: epicIds } });
    const users = await User.find({ projects: project._id });
    const result = {
      project: {
        ...project._doc,
        epics,
        issues,
        users,
      },
    };
    return result;
  } catch (e) {
    return e;
  }
};

const updateProjectById = async (projectId, updateBody) => {
  const project = await Project.findOneAndUpdate({ _id: projectId }, updateBody, { new: true, useFindAndModify: true });
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

const inviteMember = async (invitationBody) => {
  let user = await User.findOne({ email: invitationBody.email, projects: invitationBody.projectId });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, 'Already a member!');
  }
  user = await User.findOne({ email: invitationBody.email, orgId: invitationBody.orgId });
  if (user) {
    await User.findOneAndUpdate(
      { email: invitationBody.email, orgId: invitationBody.orgId },
      { $push: { projects: invitationBody.projectId } }
    );
    return;
  }
  user = await User.findOne({ email: invitationBody.email });
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, 'User is a part of different organization!');
  }
  return Invitation.create(invitationBody);
};

module.exports = {
  createProject,
  getProjectsForUser,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  inviteMember,
};
