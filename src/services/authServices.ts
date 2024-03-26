import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { compare } from "bcryptjs";
import jsonSecret from "../config/jsonSecret";
import { generateAccessToken } from "../utils/jwtUtils";

interface userData {
    name: string,
    mail: string,
    key: string
};
class authService {
    static async login(dto: userData) {
        try {
            const user  = await UserModel.getByOneField2('emailUser',dto.mail);
            if(Array.isArray(user) && user.length === 0) {
                throw new Error('usuario nao cadastrado');
            } else {
                if('passUser' in user) {
                    const compareKeys = await compare(dto.key,user.passUser);
                    if(compareKeys) {
                        if (!jsonSecret.secret) {
                            throw new Error('Chave não definida');
                        }
                        const acessToken = generateAccessToken({
                            id: user.idUser,
                            mail: user.emailUser,
                            name: user.nameUser
                        });
                        return { acessToken }
                    }
                    else {
                        throw new Error('usuario ou senha invalidos');
                    }
                }
            }
        } catch(error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    }
}
export default authService;