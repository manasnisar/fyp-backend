const allRoles = {
  member: ['checkAuth', 'getIssues', 'getProjects'],
  owner: ['getUsers', 'manageUsers', 'checkAuth', 'getIssues', 'getProjects'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
