import { usersCollection, sessionsCollection } from '../database/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export async function signUp(req, res) {
	const user = req.body;

	try {
		// create hash
		const hashPassword = bcrypt.hashSync(user.password, 12);

		// insert user in collection with hash password
		await usersCollection.insertOne({
			...user,
			password: hashPassword,
			passwordConfirmation: hashPassword,
		});
		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function signIn(req, res) {
	//const token = uuidV4();
	
	const { email } = req.body;

	try {
		const userExists = await usersCollection.findOne({ email });

		const userSession = await sessionsCollection.findOne({
			userId: userExists._id,
		});

		const data = { userId: userExists._id };
		const secretKey = process.env.JWT_SECRET;
		const config = { expiresIn: 60*60*24*30 };
		const token = jwt.sign(data, secretKey, config);

		if (userSession) {
			await sessionsCollection.deleteOne({ userId: userExists._id });
			// return res
			//   .status(401)
			//   .send({ message: "Você já está logado!" });
		}
		// insert token in session

		await sessionsCollection.insertOne({
			token,
			userId: userExists._id,
		});

		// send name, token, sessionUserID to front
		res.send({
			name: userExists.name,
			token,
			sessionUserID: userExists._id,
		});
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function signOut(req, res) {
	const { authorization } = req.headers;
	const token = authorization.replace('Bearer ', '');
	const secretKey = process.env.JWT_SECRET;
	try {
		const data = jwt.verify(token, secretKey);
		await sessionsCollection.deleteOne({ data });
		res.status(200).send({ message: 'Usuário deslogado com sucesso!' });
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: err.message });
	}
}
