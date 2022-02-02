const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const epicValidation = require('../../validations/epic.validation');
const epicController = require('../../controllers/epic.controller');

const router = express.Router();

router
  .route('/:projectId')
  .get(auth('getEpics'), validate(epicValidation.getEpicsForProject), epicController.getEpicsForProject)
  .post(auth('createEpic'), validate(epicValidation.createEpic), epicController.createEpic);

router
  .route('/manage/:epicId')
  .get(auth('getEpics'), epicController.getEpicById)
  .put(auth('manageEpics'), validate(epicValidation.updateEpic), epicController.updateEpicById)
  .delete(auth('manageEpics'), validate(epicValidation.deleteEpic), epicController.deleteEpicById);

module.exports = router;
