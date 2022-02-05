const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().valid('development', 'operations'),
    key: Joi.string().required(),
    description: Joi.string().required(),
    projectLead: Joi.required(),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string().allow(''),
    category: Joi.string().valid('development', 'operations'),
    projectLead: Joi.custom(objectId),
  }),
};

const getProjectsForUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const deleteProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId).required(),
  }),
};

const startSprint = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    noOfWeeks: Joi.number().required(),
  }),
};

const endSprint = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId).required(),
  }),
};

const inviteMember = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    projectId: Joi.string().custom(objectId),
    orgId: Joi.string().custom(objectId),
    invitationCode: Joi.string().length(6).required(),
  }),
};

module.exports = {
  createProject,
  updateProject,
  getProjectsForUser,
  deleteProject,
  inviteMember,
  startSprint,
  endSprint,
};
