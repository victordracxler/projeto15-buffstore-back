import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 6000;
app.listen(port, () => console.log('App running in port ', port));
