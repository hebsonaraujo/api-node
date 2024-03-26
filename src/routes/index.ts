import express from 'express';
import authRoute from './authRoutes';
import userRoute from './userRoutes';
const routes = (app: express.Application) => {
    app.use(
        express.json(),
        authRoute,
        userRoute
    );
}
export default routes;