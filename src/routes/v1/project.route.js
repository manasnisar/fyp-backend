const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const projectValidation = require('../../validations/project.validation');
const projectController = require('../../controllers/project.controller');

const router = express.Router();

router
  .route('/invite')
  .post(auth('inviteMembers'), validate(projectValidation.inviteMember), projectController.inviteMemberToProject);

router
  .route('/:id')
  .get(auth('getProjects'), validate(projectValidation.getProjectsForUser), projectController.getProjectsForUser)
  .post(auth('createProject'), validate(projectValidation.createProject), projectController.createProject);

router
  .route('/manage/:projectId')
  .get(auth('getProjects'), projectController.getProjectById)
  .put(auth('manageProjects'), validate(projectValidation.updateProject), projectController.updateProjectById)
  .delete(auth('manageProjects'), validate(projectValidation.deleteProject), projectController.deleteProjectById);

module.exports = router;
