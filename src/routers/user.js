import { Router } from 'express';
import { getDailyRateController } from '../controllers/user.js';
import validateBody from '../middlewares/validateBody.js';
import { getDailyRateSchema } from '../validation/user.js';

const router = Router();

router.post(
  '/daily-rate',
  validateBody(getDailyRateSchema),
  getDailyRateController,
);

export default router;
