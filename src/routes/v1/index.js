const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const organizationRoute = require('./organization.route');
const projectRoute = require('./project.route');
const epicRoute = require('./epic.route');
const issueRoute = require('./issue.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/organizations',
    route: organizationRoute,
  },
  {
    path: '/projects',
    route: projectRoute,
  },
  {
    path: '/epics',
    route: epicRoute,
  },
  {
    path: '/issues',
    route: issueRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
}

module.exports = router;
