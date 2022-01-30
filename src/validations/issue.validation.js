const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createIssue = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    key: Joi.string().required(),
    type: Joi.string().required(),
    status: Joi.string().required(),
    epicId: Joi.required().custom(objectId),
    estimate: Joi.string(),
    assigneeId: Joi.custom(objectId),
    assignee: Joi.custom(objectId),
    reporterId: Joi.required().custom(objectId),
    reporter: Joi.required().custom(objectId),
    priority: Joi.string().required(),
    description: Joi.string(),
  }),
};

const updateIssue = {
  params: Joi.object().keys({
    issueId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      type: Joi.string(),
      status: Joi.string(),
      priority: Joi.string(),
      description: Joi.string(),
      assigneeId: Joi.custom(objectId),
      assignee: Joi.custom(objectId),
      inProgressSince: Joi.date(),
      estimate: Joi.number(),
    })
    .min(1),
};

const deleteIssue = {
  params: Joi.object().keys({
    issueId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createIssue,
  updateIssue,
  deleteIssue,
};
