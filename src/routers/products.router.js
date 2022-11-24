import { Router } from 'express';
import { addProduct } from '../controllers/products.controller.js';

const router = Router();

router.post('/add-product', addProduct);

export default router;
