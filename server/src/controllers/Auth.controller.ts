import { Request, Response } from 'express';
import AsyncHandler from '../middleware/AsyncHandler';
import User from '../models/User.model';
import { BadRequestError, UnauthorizedError } from '../errors';
import { generateCode } from '../utils/GenerateCode';
import { StatusCodes } from 'http-status-codes';

/**
 * Register User
 * POST /api/v1/auth/register
 * Public
 */

export const RegisterUser = AsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError('Please provide all fields');
    }

    // check if user exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      throw new BadRequestError('Email already exists');
    }

    const verificationToken = generateCode();

    //TODO: Send email

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
    });

    user.password = '';

    res.status(StatusCodes.CREATED).json({ success: true, data: user });
  }
);

/**
 * Verify Email
 * GET /api/v1/auth/verify-email
 * Public
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
 * Resend Verification Email
 * POST /api/v1/auth/resend-verification
 * Public
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

    //TODO: Send email

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Verification code sent successfully' });
  }
);

/**
 * Login User
 * POST /api/v1/auth/login
 * Public
 */
export const LoginUser = AsyncHandler(async (req: Request, res: Response) => {
 const {email, password} = req.body;

 if(!email || !password){
   throw new BadRequestError('Please provide an email and password');
 }

 const user = await User.findOne({email})

  if(!user){
    throw new UnauthorizedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Username or password is incorrect');
  }

  if (!user.isVerified) {
    throw new UnauthorizedError('Email not verified');
  }

  res.status(StatusCodes.OK).json({ success: true, data: user });

});

/**
 * Logout User
 * GET /api/v1/auth/logout
 * Private
 */
export const LogoutUser = AsyncHandler(async (req: Request, res: Response) => {
  res.send('Logout User');
});
