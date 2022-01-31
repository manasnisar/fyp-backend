const allRoles = {
  member: [
    'checkAuth',
    'getIssues',
    'getProjects',
    'createProject',
    'createEpic',
    'createIssue',
    'manageIssues',
    'createComment',
    'manageComments',
    'getEpics',
    'manageEpics',
  ],
  owner: [
    'getUsers',
    'manageUsers',
    'checkAuth',
    'getIssues',
    'getProjects',
    'createProject',
    'createEpic',
    'createIssue',
    'manageIssues',
    'createComment',
    'manageComments',
    'getEpics',
    'manageEpics',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
