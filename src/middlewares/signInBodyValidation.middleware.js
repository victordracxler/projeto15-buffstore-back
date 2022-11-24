import { usersCollection } from "../database/db.js";
import { usersSignInSchema } from "../models/users.model.js";
import bcrypt from "bcrypt";

export async function signInBodyValidation(req, res, next) {
    const { email, password } = req.body;
    const user = req.body;
    const { error } = usersSignInSchema.validate(user, { abortEarly: false });
    
    // verify errors in schema
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      console.log(errors);
      return res.status(400).send(errors);
    }
    
    // verify if user exists
    const userExists = await usersCollection.findOne({ email });
    if (!userExists) {
      return res.sendStatus(401);
    }
    
    // verify password
    const rightPassword = bcrypt.compareSync(password, userExists.password);
    if (!rightPassword) {
      return res.sendStatus(401);
    }
  
    next();
  }