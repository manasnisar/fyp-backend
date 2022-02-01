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
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string().allow(''),
      category: Joi.string().valid('development', 'operations'),
      projectLead: Joi.custom(objectId),
    })
    .min(1),
};

const getProjectsForOrganization = {
  params: Joi.object().keys({
    orgId: Joi.string().custom(objectId),
  }),
};

const deleteProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProject,
  updateProject,
  getProjectsForOrganization,
  deleteProject,
};
