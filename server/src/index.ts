import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import ConnectDB from './config/database';

const app: Express = express();

//routes
import AuthRoutes from './routes/Auth.routes';

//middlewares
import ErrorHandlerMiddleware from './middleware/ErrorsHandler';
import NotFoundHandler from './middleware/NotFound';

app.use(express.json());

app.use('/api/v1/auth', AuthRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(ErrorHandlerMiddleware as unknown as express.ErrorRequestHandler);
app.use(NotFoundHandler);

async function StartApp() {
  const port = process.env.PORT || 3000;

  try {
    await ConnectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

StartApp();
