const httpStatus = require('http-status');
const { notificationService } = require('../services');
const ApiError = require('../utils/ApiError');

const readNotifications = async (req, res) => {
  try {
    await notificationService.readNotifications(req.body.notificationIds);
    res.send(httpStatus.OK);
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = notificationService.getNotifications(req.body.receiver);
    res.status(httpStatus.OK).send(notifications);
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  readNotifications,
  getNotifications,
};
