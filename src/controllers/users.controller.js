import { usersCollection, sessionsCollection } from '../database/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

export async function signUp (req, res){
    const user = req.body;
  
    try {
    // create hash
    const hashPassword = bcrypt.hashSync(user.password, 12);

    // insert user in collection with hash password
    await usersCollection.insertOne({ ...user, password: hashPassword, passwordConfirmation: hashPassword });
    res.sendStatus(201);

    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };

export async function signIn(req, res) {
    const token = uuidV4();
    const {email} = req.body
    try {
    // insert token in session
    const userExists = await usersCollection.findOne({ email });
    
      await sessionsCollection.insertOne({
        token,
        userId: userExists._id,
      });
      // send token to front
      res.send({ name: userExists.name, token });

    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }