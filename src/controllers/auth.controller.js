const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, organizationService } = require('../services');
const getRandomAvatarUrl = require('../utils/getRandomAvatarUrl');

const register = catchAsync(async (req, res) => {
  let user;
  try {
    const orgExist = await organizationService.orgExists(req.body.organization);
    req.body.avatarUrl = getRandomAvatarUrl();
    if (req.body.role === 'member') {
      if (!orgExist) {
        res.status(httpStatus.NOT_FOUND).send('Organization not found!');
        return;
      }
      user = await userService.createUser(req.body);
      await organizationService.addMemberToOrgByID({ name: req.body.organization, member: user._id });
    } else if (req.body.role === 'owner') {
      if (orgExist) {
        res.status(httpStatus.BAD_REQUEST).send('Organization already exists!');
        return;
      }
      user = await userService.createUser(req.body);
      const org = await organizationService.createOrganization({ name: req.body.organization, owner: user._id });
      user = await userService.updateUserById(user._id, { orgId: org._id });
    }
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (e) {
    res.status(e.statusCode).send(e.message);
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const authChecker = catchAsync(async (req, res) => {
  res.send({ user: req.user });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  authChecker,
};
