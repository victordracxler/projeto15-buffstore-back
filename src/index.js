import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRoutes from './routers/users.router.js'

import './database/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRoutes);

const port = process.env.PORT || 6000;
app.listen(port, () => console.log('App running in port ', port));
