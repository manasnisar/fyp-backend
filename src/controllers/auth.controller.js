const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, organizationService } = require('../services');
const { Invitation, User } = require('../models');

const register = catchAsync(async (req, res) => {
  let user;
  try {
    const org = await organizationService.orgExists(req.body.organization);
    if (req.body.role === 'member') {
      if (!org) {
        res.status(httpStatus.NOT_FOUND).send('Organization not found!');
        return;
      }
      const invitation = await Invitation.findOne({
        invitationCode: req.body.invitationCode,
        email: req.body.email,
        orgId: org._id,
      });
      if (!invitation) {
        res.status(httpStatus.NOT_FOUND).send('Invalid invite code!');
        return;
      }
      req.body.orgId = org._id;
      user = await userService.createUser({ ...req.body, isEmailVerified: true });
      user = await User.findOneAndUpdate({ _id: user._id }, { $push: { projects: invitation.projectId } });
      await organizationService.addMemberToOrgByID({ orgId: org._id, member: user._id });
      await Invitation.remove({ _id: invitation._id });
    } else if (req.body.role === 'owner') {
      if (org) {
        res.status(httpStatus.BAD_REQUEST).send('Organization already exists!');
        return;
      }
      user = await userService.createUser(req.body);
      const newOrg = await organizationService.createOrganization({ name: req.body.organization, owner: user._id });
      user = await userService.updateUserById(user._id, { orgId: newOrg._id });
      const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
      await emailService.sendVerificationEmail(user.email, verifyEmailToken);
    }
    res.status(httpStatus.CREATED).send({ user });
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
  await authService.resetPassword(req.body.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.params.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const authChecker = catchAsync(async (req, res) => {
  global.socketio.emit('fetch_notifications');
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
