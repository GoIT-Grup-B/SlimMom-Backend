import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';
<<<<<<< HEAD
import {
  registerUserController,
  loginUserController,
  refreshUserController,
} from '../controllers/auth.js';
import { loginUserSchema } from '../validation/auth.js';
import { logoutUser } from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/refresh', ctrlWrapper(refreshUserController));

router.post('/logout', authenticate, logoutUser);
=======
import { registerUserController, loginUserController, refreshUserController } from '../controllers/auth.js';
import { loginUserSchema } from '../validation/auth.js';

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(loginUserSchema),ctrlWrapper(loginUserController));
router.post('/refresh',ctrlWrapper(refreshUserController));
>>>>>>> development

export default router;
