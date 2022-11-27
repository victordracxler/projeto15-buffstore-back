import { ObjectId } from 'mongodb';
import {
	cartCollection,
	productsCollection,
	sessionsCollection,
} from '../database/db.js';

export async function addProduct(req, res) {
	const { name, type, price, description, image } = req.body;
	console.log(req.body);

	const obj = {
		name,
		type,
		price,
		description,
		image,
	};

	try {
		await productsCollection.insertOne(obj);
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function getAllProducts(req, res) {
	try {
		const products = await productsCollection.find().toArray();

		res.send(products);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function getOneProduct(req, res) {
	const { id } = req.params;

	try {
		const product = await productsCollection.findOne({ _id: ObjectId(id) });
		res.send(product);
	} catch (error) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function addToCart(req, res) {
	const { productId } = req.body;
	const { authorization } = req.headers;
	const token = authorization.replace('Bearer ', '');

	try {
		const session = await sessionsCollection.findOne({ token });
		const cartExists = await cartCollection.findOne({
			userId: session.userId,
		});
		if (!cartExists) {
			await cartCollection.insertOne({
				userId: session.userId,
				products: [productId],
			});
			res.sendStatus(200);
			return;
		}

		const newCartArray = [...cartExists.products, productId];
		await cartCollection.updateOne(
			{ userId: session.userId },
			{ $set: { products: newCartArray } }
		);
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function getCart(req, res){
	const { authorization } = req.headers;
	const token = authorization.replace('Bearer ', '');
	
	try{
	const session = await sessionsCollection.findOne({ token });

	const cartExists = await cartCollection.findOne({
		userId: session.userId,
	});
	if (!cartExists) {
		await cartCollection.insertOne({
			userId: session.userId,
			products: [productId],
		});
		res.sendStatus(200);
		return;
	}
	res.send(cartExists)
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}