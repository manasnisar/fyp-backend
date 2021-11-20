const httpStatus = require('http-status');
const { Organization } = require('../models');
const ApiError = require('../utils/ApiError');

const getOrganizationById = async (id) => {
  return Organization.findById(id);
};

module.exports = {
  getOrganizationById,
};
