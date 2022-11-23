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
