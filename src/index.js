import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import './database/db.js';

import productRouters from './routers/products.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(productRouters);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('App running in port ', port));
