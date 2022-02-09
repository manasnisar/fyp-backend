const { Notification } = require('../models');

const readNotifications = async (notificationIds) => {
  return Notification.updateMany({ _id: { $in: notificationIds } }, { $set: { read: true } }, { multi: true });
};

const getNotifications = async (receiver) => {
  return Notification.find({ receiver }).populate('sender').populate('issue');
};

module.exports = {
  readNotifications,
  getNotifications,
};
