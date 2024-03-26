import { Router } from 'express';
import UserController from '../controllers/UserController';
import jwtAuth from '../middlewares/jwtMiddleware';

const userRoute = Router();
userRoute.get('/login', UserController.loginPage);
userRoute.get('/protected', jwtAuth, (req, res) => {
    res.json({ message: 'Rota protegida com sucesso!', userId: req.body.userId });
});
userRoute.use(jwtAuth);
userRoute.get('/users', UserController.listAllUser);
userRoute.post('/users', UserController.insertUser);
userRoute.get('/users/id/:id',UserController.listByUserId);
userRoute.put('/users/id/:id', UserController.editUser);
userRoute.delete('/users/id/:id', UserController.deleteUser);
userRoute.get('/edit/:id', UserController.showEditPage);

export default userRoute;