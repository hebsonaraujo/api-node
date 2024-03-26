import { Request, Response } from "express";
import authService from "../services/authServices";
class AuthController {
    static async login(req: Request,res: Response) {
        const { name, mail, key } = req.body;
        try {
            const accessToken = await authService.login({name, mail, key});
            req.headers.authorization = `Bearer ${accessToken?.acessToken} `;
            // Configurando o cookie HttpOnly
            res.cookie('tokenBackEnd', accessToken, { httpOnly: true });
            res.status(200).send(accessToken);
        } catch(error) {
            res.status(401).send({message: `erro na autenticacao  - ${error}`});
        }
    }
}
export default AuthController;