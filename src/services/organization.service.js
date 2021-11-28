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

const addMemberToOrgByID = async (data) => {
  const org = await Organization.findOneAndUpdate(
    { name: data.name },
    {
      $addToSet: {
        memberIds: data.member,
      },
    },
    { useFindAndModify: true, new: true }
  );
  if (!org) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Organization not found!');
  }
};

const orgExists = async (name) => {
  const check = await Organization.exists({ name });
  return check;
};

module.exports = {
  getOrganizationById,
  createOrganization,
  addMemberToOrgByID,
  orgExists,
};
