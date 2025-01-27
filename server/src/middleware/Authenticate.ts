import { Request, Response, NextFunction } from 'express';
import attachCookieToResponse, { verifyJWT } from '../utils/JWT';
import Token from '../models/Token.model';
import { UnauthorizedError } from '../errors';

export default async function Authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = verifyJWT(accessToken);
      if (typeof payload !== 'string') {
        req.user = payload.user;
      }
      return next();
    }
    const payload = verifyJWT(refreshToken);
    if (typeof payload === 'string') {
      throw new UnauthorizedError('Authentication Invalid');
    }

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthorizedError('Authentication Invalid');
    }

    attachCookieToResponse({
      res,
      user: payload.user,
      token: existingToken.token,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new UnauthorizedError('Authentication Invalid');
  }
}
