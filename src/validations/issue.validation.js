const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createIssue = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    key: Joi.string().required(),
    type: Joi.string().required(),
    status: Joi.string().required(),
    epicId: Joi.required().custom(objectId),
    estimate: Joi.string().allow(null, ''),
    assigneeId: Joi.custom(objectId).allow(null),
    assignee: Joi.custom(objectId).allow(null),
    reporterId: Joi.required().custom(objectId),
    reporter: Joi.required().custom(objectId),
    priority: Joi.string().required(),
    description: Joi.string().allow(''),
    creationDate: Joi.date(),
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
      timeSpent: Joi.number(),
      timeRemaining: Joi.number(),
      description: Joi.string(),
      assigneeId: Joi.custom(objectId).allow(null),
      assignee: Joi.custom(objectId).allow(null),
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
