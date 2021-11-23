const httpStatus = require('http-status');
const { Organization } = require('../models');
const ApiError = require('../utils/ApiError');

const getOrganizationById = async (id) => {
  const organization = await Organization.findById(id);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  return organization;
};

const createOrganization = async (data) => {
  if (await Organization.isOrganizationNameTaken(data.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Organization name already taken!');
  }
  return Organization.create(data);
};

module.exports = {
  getOrganizationById,
  createOrganization,
};
