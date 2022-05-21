const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { notificationService } = require('../services');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const readNotifications = async (req, res) => {
  try {
    await notificationService.readNotifications(req.params.notificationId);
    global.socketio.emit('fetch_notifications');
    res.send(httpStatus.OK);
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const readAllNotifications = async (req, res) => {
  try {
    await notificationService.readAllNotifications(req.params.userId);
    global.socketio.emit('fetch_notifications');
    res.send(httpStatus.OK);
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getNotifications = async (req, res) => {
  try {
    let userId;
    jwt.verify(req.params.token, config.jwt.secret, (err, decoded) => {
      if (err) throw err;
      userId = decoded.sub;
    });
    const notifications = await notificationService.getNotifications(userId);
    res.status(httpStatus.OK).send(notifications);
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
  }
};

module.exports = {
  readNotifications,
  getNotifications,
  readAllNotifications,
};
