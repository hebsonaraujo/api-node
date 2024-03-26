import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authRoute = Router();
authRoute.post('/auth/login',AuthController.login);
export default authRoute;