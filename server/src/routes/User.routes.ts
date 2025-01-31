import { Router } from 'express';
import {
  GetCurrentUser,
  UpdatePassword,
  UpdateUser,
  GetSingleUser,
} from '../controllers/User.controller';
import Authenticate from '../middleware/Authenticate';

const router = Router();

router.get('/:id', GetSingleUser);

router.get('/me', Authenticate, GetCurrentUser);

router.patch('/update', Authenticate, UpdateUser);

router.patch('/update-password', Authenticate, UpdatePassword);

export default router;
