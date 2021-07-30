import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import './database/index';
import { router } from './routes';
dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
