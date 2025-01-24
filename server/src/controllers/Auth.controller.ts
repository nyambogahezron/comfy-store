import { Request, Response } from 'express';
import AsyncHandler from '../middleware/AsyncHandler';
import User from '../models/User.model';
import { BadRequestError } from '../errors';

/**
 * Register User
 * POST /api/v1/auth/register
 * Public
 */

export const RegisterUser = AsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // check if user exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      throw new BadRequestError('Email already exists');
    }

    console.log(name, email, password);
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
