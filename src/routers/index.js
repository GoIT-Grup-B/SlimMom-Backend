import authRouter from './user.js';
import { Router } from 'express';

const router = Router();
app.use('/api/myproducts', myProductsRouter);
router.use('/auth', authRouter);

export default router;
