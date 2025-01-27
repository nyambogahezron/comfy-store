import { Router } from 'express';
import {
  GetCurrentUser,
  UpdatePassword,
  UpdateUser,
} from '../controllers/User.controller';
import Authenticate from '../middleware/Authenticate';

const router = Router();

router.get('/me', Authenticate, GetCurrentUser);

router.put('/update', UpdateUser);

router.put('/update-password', UpdatePassword);

export default router;
