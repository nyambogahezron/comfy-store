import { Router } from 'express';

import {
  RegisterUser,
  LoginUser,
  LogoutUser,
} from '../controllers/Auth.controller';

const router = Router();

router.post('/register', RegisterUser);

router.post('/login', LoginUser);

router.get('/logout', LogoutUser);

export default router;
