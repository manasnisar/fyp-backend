const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { organizationService } = require('../services');

const getOrganization = catchAsync(async (req, res) => {
  const organization = await organizationService.getOrganizationById(req.params.orgId);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  res.send(organization);
});

module.exports = {
  getOrganization,
};
