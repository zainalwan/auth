import express from 'express';
import { router as registerRouter } from './routes/register';
import { router as loginRouter } from './routes/login';

export const app = express();

app.use(express.json());

app.use('/register', registerRouter);
app.use('/login', loginRouter);
