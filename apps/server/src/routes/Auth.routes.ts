import { Router } from 'express';

import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  VerifyEmail,
  ResendVerificationCode,
  ResetPassword,
} from '../controllers/Auth.controller';

const router = Router();

router.post('/register', RegisterUser);

router.post('/login', LoginUser);

router.delete('/logout', LogoutUser);

router.post('/verify-email', VerifyEmail);

router.post('/resend-verification', ResendVerificationCode);

router.post('/reset-password', ResetPassword);

export default router;
