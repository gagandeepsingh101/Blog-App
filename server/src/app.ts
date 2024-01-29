import express from 'express';
import { userRouter } from './routes/user.routes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/blog", userRouter);

export default app;