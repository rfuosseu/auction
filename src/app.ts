import { GetResult } from './auction/auction.controller';
import express, { Request, Response, NextFunction, Errback } from 'express';

const app = express();
app.use(express.json());
app.post('/results', GetResult);
app.use((req: Request, res: Response, next: NextFunction) =>
  res.status(404).send('Not found!')
);

export default app;
