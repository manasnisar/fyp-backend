const allRoles = {
  member: ['checkAuth', 'getIssues', 'getProjects', 'createProject'],
  owner: ['getUsers', 'manageUsers', 'checkAuth', 'getIssues', 'getProjects', 'createProject'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
