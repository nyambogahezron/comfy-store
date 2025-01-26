import { Router } from 'express';

import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  VerifyEmail,
  ResendVerificationCode,
} from '../controllers/Auth.controller';

const router = Router();

router.post('/register', RegisterUser);

router.post('/login', LoginUser);

router.get('/logout', LogoutUser);

router.post('/verify-email', VerifyEmail);

router.post('/resend-verification', ResendVerificationCode);

export default router;
