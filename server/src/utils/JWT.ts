import jwt from 'jsonwebtoken';
import { InternalServerError } from '../errors';

/**
 *
 * @returns JWT_SECRET from .env file
 */
const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new InternalServerError('JWT_SECRET is not defined');
  }
  return secret;
};

/** create token object */

export const JWT = (payload: any) => {
  return jwt.sign(payload, getSecret());
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, getSecret());
};

type attachCookieProps = {
  res: any;
  token: string;
  user: any;
};

export default function attachCookieToResponse({
  res,
  token,
  user,
}: attachCookieProps) {
  const oneDay = 1000 * 60 * 60 * 24; // 24 hours
  const LongTime = 1000 * 60 * 60 * 24 * 30; // 30 days

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  };

  const accessToken = JWT({ payload: user });
  const refreshToken = JWT({ payload: { user, token } });

  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + LongTime),
  });
}
