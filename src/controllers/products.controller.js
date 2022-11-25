import { ObjectId } from 'mongodb';
import { productsCollection } from '../database/db.js';

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
