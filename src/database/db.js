import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
	await mongoClient.connect();
	console.log('MONGODB connected!');
} catch (err) {
	console.log(err);
}

const db = mongoClient.db('buffstoreAPI');

const usersCollection = db.collection('users');
const productsCollection = db.collection('products');
const cartCollection = db.collection('cart');