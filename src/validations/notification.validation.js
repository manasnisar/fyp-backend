const Joi = require('joi');

const readNotifications = {
  body: Joi.object().keys({
    notificationIds: Joi.array().required(),
  }),
};

const getNotifications = {
  body: Joi.object()
    .keys({
      receiver: Joi.array().required(),
    })
    .min(1),
};

module.exports = {
  readNotifications,
  getNotifications,
};
