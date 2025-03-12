import { Router } from 'express';
import { getDailyRateController } from '../controllers/user.js';
import validateBody from '../middlewares/validateBody.js';
import { getDailyRateSchema } from '../validation/user.js';
import { addMyProducts } from '../controllers/myProducts/addMyProducts.js';
import { getMyProducts } from '../controllers/myProducts/getMyProducts.js';
import { deleteMyProducts } from '../controllers/myProducts/deleteMyProducts.js';
import { countCalories } from '../controllers/myProducts/countCalories.js';

const router = Router();

router.post('/', addMyProducts);
router.get('/', getMyProducts);
router.delete('/:id', deleteMyProducts);
router.get('/calories', countCalories);

router.get(
  '/daily-rate',
  validateBody(getDailyRateSchema),
  getDailyRateController,
);

export default router;