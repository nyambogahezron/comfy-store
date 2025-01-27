import { Request, Response } from 'express';
import AsyncHandler from '../middleware/AsyncHandler';
import User from '../models/User.model';
import { UnauthorizedError } from '../errors';

/**
 * @description Get Current User
 * @GET /api/v1/auth/me
 * @access Private
 */
export const GetCurrentUser = AsyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.user);

    if (!req.user) {
      throw new UnauthorizedError('Unauthorized access');
    }

    const user = await User.findById(req.user?.userId).select('-password');
    res.json({ success: true, data: user });
  }
);

/**
 * @description Update User
 * @PUT /api/v1/auth/update
 * @access Private
 */
export const UpdateUser = AsyncHandler(
  async (req: Request, res: Response) => {}
);

/**
 * @description Update Password
 * @PUT /api/v1/auth/update-password
 * @access Private
 */
export const UpdatePassword = AsyncHandler(
  async (req: Request, res: Response) => {}
);
