import { usersSignUpSchema } from "../models/users.model.js";
import { usersCollection } from "../database/db.js";

export async function signUpBodyValidation(req, res, next){
    const user = req.body;

    // verify error from schema
    const { error } = usersSignUpSchema.validate(user, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        console.log(errors);
        return res.status(400).send(errors);
    }
    // verify if user already exists
    const userAlreadyExists = await usersCollection.findOne({ email: user.email });
    if (userAlreadyExists){
        return res.status(409).send({message: "Esse usuário já existe!"});
    }

    next();
}   