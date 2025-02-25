import { Request, Response } from 'express';
import crypto from 'crypto';
import AsyncHandler from '../middleware/AsyncHandler';
import User from '../models/User.model';
import Token from '../models/Token.model';
import { BadRequestError, UnauthorizedError } from '../errors';
import { generateCode } from '../utils/GenerateCode';
import { StatusCodes } from 'http-status-codes';
import attachCookieToResponse from '../utils/JWT';
import CreateHash from '../utils/CreateHash';
import { UserProps } from '../types';
import SendEmail from '../utils/SendEmail';

/**
 *@description Register User
 *@POST /api/v1/auth/register
 *@access Public
 */

export const RegisterUser = AsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError('Please provide all fields');
    }

    // check if user exists
    const emailExists = await User.findOne({ email }).select('-password');

    if (emailExists) {
      throw new BadRequestError('Email already exists');
    }

    const verificationToken = generateCode();

    await SendEmail({
      email,
      name,
      subject: 'Comfy Store - Email Verification',
      message: verificationToken,
      category: 'confirmation',
    });

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
    });

    user.set('password', undefined, { strict: false });
    res.status(StatusCodes.CREATED).json({ success: true, data: user });
  }
);

/**
 *@description Verify Email
 *@GET /api/v1/auth/verify-email
 *@access Public
 */

export const VerifyEmail = AsyncHandler(async (req: Request, res: Response) => {
  const { verificationToken, email } = req.body;

  if (!verificationToken || !email) {
    throw new BadRequestError('A verification token and email are required');
  }

  const user = await User.findOne({ email, verificationToken });

  if (!user) {
    throw new BadRequestError('Invalid verification token');
  }

  if (user.isVerified) {
    throw new BadRequestError('Email already verified');
  }

  if (user.verificationToken !== verificationToken) {
    throw new BadRequestError('Invalid verification token');
  }

  user.isVerified = true;
  user.verificationToken = '';

  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: 'Email verified successfully' });
});

/**
 *@description Resend Verification Email
 *@POST /api/v1/auth/resend-verification
 *@access Public
 */

export const ResendVerificationCode = AsyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError('Please provide an email');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestError('Email already verified');
    }

    const verificationToken = generateCode();

    user.verificationToken = verificationToken;

    await user.save();

    await SendEmail({
      email: user.email,
      name: user.name,
      subject: 'Comfy Store - Email Verification',
      message: verificationToken,
      category: 'confirmation',
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Verification code sent successfully' });
  }
);

/**
 *@description Login User
 *@POST /api/v1/auth/login
 *@access Public
 */
export const LoginUser = AsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide an email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Username or password is incorrect');
  }

  if (!user.isVerified) {
    throw new UnauthorizedError('Email not verified');
  }

  const tokenObj: UserProps = {
    userId: user._id,
    name: user.name,
    email: user.email,
  };
  let refreshToken = '';

  // check if user has a refresh token
  const existingRefreshToken = await Token.findOne({ user: user._id });

  if (existingRefreshToken) {
    const { isValid } = existingRefreshToken;

    if (!isValid) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    refreshToken = existingRefreshToken.token;
    attachCookieToResponse({ res, user: tokenObj, token: refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenObj });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');

  const userToken = {
    user: user._id,
    token: refreshToken,
    type: 'emailLogin',
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    isValid: true,
  };

  await Token.create(userToken);

  attachCookieToResponse({ res, user: tokenObj, token: refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenObj });
});

/**
 * @description Forgot Password
 * @POST /api/v1/auth/forgot-password
 * @access Public
 */

export const ForgotPassword = AsyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError('Please provide an email');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('User not found');
    }

    const resetToken = generateCode();
    const tenMinutes = 10 * 60 * 1000;
    const passwordResetExpires = Date.now() + tenMinutes;

    user.passwordToken = CreateHash(resetToken);
    user.passwordTokenExpires = new Date(passwordResetExpires);

    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Reset token sent successfully' });
  }
);

/**
 * @description Reset Password
 * @POST /api/v1/auth/reset-password
 * @access Public
 */

export const ResetPassword = AsyncHandler(
  async (req: Request, res: Response) => {
    const { token, email, password } = req.body;

    if (!token || !email || !password) {
      throw new BadRequestError('Please provide all fields');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('User not found');
    }

    const currentTime = Date.now();
    const hashedToken = CreateHash(token);

    if (user.passwordToken !== hashedToken) {
      throw new BadRequestError('Invalid token');
    }

    if (
      !user.passwordTokenExpires ||
      currentTime > user.passwordTokenExpires.getTime()
    ) {
      throw new BadRequestError('Token expired');
    }

    user.password = password;
    user.passwordToken = '';
    user.passwordTokenExpires = undefined;

    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Password reset successfully' });
  }
);

/**
 *@description logout user
 *@DELETE /api/v1/auth/logout
 * @access Private
 */
export const LogoutUser = AsyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;
  await Token.findOneAndDelete({ user: userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
});
