const allRoles = {
  member: ['checkAuth'],
  owner: ['getUsers', 'manageUsers', 'checkAuth'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
