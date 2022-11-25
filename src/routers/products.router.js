import { Router } from 'express';
import {
	addProduct,
	getAllProducts,
	getOneProduct,
} from '../controllers/products.controller.js';

const router = Router();

router.post('/add-product', addProduct);

router.get('/products', getAllProducts);

router.get('/products/:id', getOneProduct);

export default router;
