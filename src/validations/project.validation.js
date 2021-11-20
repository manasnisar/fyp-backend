const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    pin: Joi.string().required(),
    organization: Joi.required().custom(objectId),
    timeCreated: Joi.string().required().isoDate(),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      pin: Joi.string().required(),
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
