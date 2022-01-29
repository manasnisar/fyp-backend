const allRoles = {
  member: ['checkAuth', 'getIssues', 'getProjects', 'createProject', 'createEpic', 'createIssue'],
  owner: ['getUsers', 'manageUsers', 'checkAuth', 'getIssues', 'getProjects', 'createProject', 'createEpic', 'createIssue'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
