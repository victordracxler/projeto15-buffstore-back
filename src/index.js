import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './routers/users.router.js';
import productRouter from './routers/products.router.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRouter);

app.use(productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('App running in port ', port));
