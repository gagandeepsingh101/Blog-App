import express from 'express';
import { userRouter } from './routes/user.routes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { blogRouter } from './routes/blog.routes.js';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

export default app;