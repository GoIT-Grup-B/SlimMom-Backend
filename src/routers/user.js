import { Router } from 'router';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';
import {
  registerUserController,
  logoutUserController,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default router;
