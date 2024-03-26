import express from 'express';
import routes from './src/routes/index';
import ErrorMiddleware from './src/middlewares/errorHandling';
import path from 'path';
import cors from 'cors';

const app = express();
/**
 * Server config
 */
app.use(cors());
/**
 * router
 */
routes(app);
/**
 * error handling
 */
app.use(ErrorMiddleware.handler404);
/**
 * server listener
 */
app.use(express.static(path.join(__dirname, 'public')));

export default app;