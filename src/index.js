import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import './database/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('App running in port ', port));
