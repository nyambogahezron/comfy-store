import { Request, Response } from 'express';
import AsyncHandler from '../middleware/AsyncHandler';
import User from '../models/User.model';
import { BadRequestError, UnauthorizedError } from '../errors';

/**
 * @description Get Current User
 * @GET /api/v1/auth/me
 * @access Private
 */
export const GetCurrentUser = AsyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new UnauthorizedError('Unauthorized access');
    }

    const user = await User.findById(req.user?.userId).select('-password');
    res.json({ success: true, data: user });
  }
);

/**
 * @description Update User
 * @PATCH /api/v1/auth/update
 * @access Private
 */
export const UpdateUser = AsyncHandler(async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const userId = req.user?.userId;

  const user = await User.findById(userId);

  if (!user) {
    throw new UnauthorizedError('Unauthorized access');
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();

  res.json({ success: true, data: user });
});

/**
 * @description Update Password
 * @PATCH /api/v1/auth/update-password
 * @access Private
 */
export const UpdatePassword = AsyncHandler(
  async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.userId;

    if (!currentPassword || !newPassword) {
      throw new BadRequestError('Invalid credentials');
    }

    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new UnauthorizedError('Unauthorized access');
    }

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    user.password = newPassword;

    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  }
);

/**
 * @description Get Single User
 * @GET /api/v1/auth/user/:id
 * @access Public
 */

export const GetSingleUser = AsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      throw new BadRequestError('User not found');
    }

    res.json({ success: true, data: user });
  }
);
