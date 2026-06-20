import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import UserControllerRouter from '../routes/UserControllerRouter.mts';
import NewAccessTokenRouter from '../routes/NewAccessTokenRouter.mts';
import BikeControllerRouter from '../routes/BikeControllerRouter.mts';
import cors from 'cors';
import Connect from '../model/Connect.mts';
import { createClient } from 'redis';
import StripeWebhook from '../controller/StripeWebhook.mts';

export const client = createClient({
    url: 'redis://localhost:6379',
});
await client.connect();

const App = express();

App.post('/my-webhook', express.raw({ type: 'application/json' }), StripeWebhook);

App.use(express.json({ limit: '50mb' }));
App.use(cookieParser());
App.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

Connect();

App.use('/', UserControllerRouter);
App.use('/', BikeControllerRouter);
App.use('/', NewAccessTokenRouter);

App.listen(process.env.Port, () => console.log('server is running'));