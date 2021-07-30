import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
dotenv.config();
const port = process.env.PORT;

createConnection()
  .then(async () => {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
      res.json({ message: 'Hello World!' });
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
