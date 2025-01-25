import { Request, Response } from 'express';
import AsyncHandler from '../middleware/AsyncHandler';
import User from '../models/User.model';
import { BadRequestError } from '../errors';
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
 * Login User
 * POST /api/v1/auth/login
 * Public
 */
export const LoginUser = AsyncHandler(async (req: Request, res: Response) => {
  res.send('Login User');
});

/**
 * Logout User
 * GET /api/v1/auth/logout
 * Private
 */
export const LogoutUser = AsyncHandler(async (req: Request, res: Response) => {
  res.send('Logout User');
});
