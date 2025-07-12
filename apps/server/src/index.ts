import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import ConnectDB from './config/database';
import cookieParser from './middleware/CookieParser';

const app: Express = express();

//routes
import AuthRoutes from './routes/Auth.routes';
import UserRoutes from './routes/User.routes';
import ProductRoutes from './routes/Product.routes';
import OrganizationRoutes from './routes/Organization.routes';
import OrderRoutes from './routes/Order.routes';

//middlewares
import ErrorHandlerMiddleware from './middleware/ErrorsHandler';
import NotFoundHandler from './middleware/NotFound';

app.use(express.json());

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}
app.use(cookieParser({ secret: process.env.JWT_SECRET }));

app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/products', ProductRoutes);
app.use('/api/v1/org', OrganizationRoutes);
app.use('/api/v1/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Comfy-store API');
});

app.use(ErrorHandlerMiddleware as unknown as express.ErrorRequestHandler);
app.use(NotFoundHandler);

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

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
