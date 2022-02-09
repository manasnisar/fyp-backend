const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { notificationValidation } = require('../../validations');
const { notificationController } = require('../../controllers');

const router = express.Router();

router.post(
  '/read',
  auth('readNotifications'),
  validate(notificationValidation.readNotifications),
  notificationController.readNotifications
);

router.post(
  '/get',
  auth('getNotifications'),
  validate(notificationValidation.getNotifications),
  notificationController.getNotifications
);

module.exports = router;
