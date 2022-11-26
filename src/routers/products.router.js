import { Router } from 'express';
import {
	addProduct,
	addToCart,
	getAllProducts,
	getOneProduct,
} from '../controllers/products.controller.js';

const router = Router();

router.post('/add-product', addProduct);

router.get('/products', getAllProducts);

router.get('/products/:id', getOneProduct);

router.post('/addtocart', addToCart);

export default router;
