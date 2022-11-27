import { Router } from 'express';
import {
	addProduct,
	addToCart,
	getAllProducts,
	getCart,
	getOneProduct,
} from '../controllers/products.controller.js';

const router = Router();

router.post('/add-product', addProduct);

router.get('/products', getAllProducts);

router.get('/products/:id', getOneProduct);

router.post('/addtocart', addToCart);

router.get('/cart', getCart);

export default router;
