const allRoles = {
  member: ['checkAuth', 'getIssues', 'getProjects', 'createProject', 'createEpic', 'createIssue', 'manageIssues'],
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
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
