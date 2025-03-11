import { router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper';

router.get('/searchProducts', ctrlWrapper(getAllProductsByQuery));
