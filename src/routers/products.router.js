import { Router } from 'express';
import {
	addProduct,
	getAllProducts,
} from '../controllers/products.controller.js';

const router = Router();

router.post('/add-product', addProduct);

router.get('/products', getAllProducts);

export default router;
