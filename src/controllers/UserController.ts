import connection from "../config/dbConn";
import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import * as bcrypt from 'bcryptjs';
import path = require("path");

class UserController  {
    constructor(){}
    static  async listAllUser(req: Request,res: Response) {
        const { user } = req.headers
        console.log('USER',user,req.headers)
        const users =  await UserModel.getAll()
        res.status(200).json(users);
    }
    static async listByUserId(req: Request,res: Response) {
        const { id }  = req.params;
        const [user] = await UserModel.getById(Number(id));
        res.status(200).json(user);
    }
    static async insertUser(req: Request,res: Response) {
        const { name, mail, key } = req.body;
        try {
            const result =  await UserModel.getByOneField('emailUser',mail);
            if (Array.isArray(result) && result.length > 0) {
                throw new Error('Usuário já cadastrado');
            } else {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(key, saltRounds);
                const values = [name,mail,hashedPassword];
                console.log('Nenhum resultado encontrado.');
                try {
                    const idUser = await UserModel.insertUser(values);
                    const user  = await UserModel.getById(idUser);
                    if (user) {
                        console.log('Usuário inserido:', user);
                    } else {
                        console.error('Usuário não encontrado após a inserção.');
                    }
                    res.status(201).send(user);
                }
                catch(error) {
                    res.status(400).send({message: 'erro ao cadastrar novo usuario - ' + error})
                }
            }
        } catch (error) {
            res.status(400).send({ message: `${error}` });
        }
    }
    static async editUser(req: Request,res: Response) {
        const id   = Number(req.params.id);
        const { name, mail } = req.body;
        try {
            const [user] = await UserModel.editUser({name, mail, id});
            res.status(200).json(user);
        } catch (error) {
            res.status(400).send({message: 'erro ao atualizar usuario - ' + error})
        }
    }
    static async deleteUser(req: Request,res: Response) {
        const id  = Number(req.params.id);
        try {
            const [user] = await UserModel.deleteUser(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).send({message: 'erro ao excluir usuario - ' + error})
        }
        console.log('=========Id',id)
    }
    static showEditPage(req: Request,res: Response) {
        const editPagePath = path.join(__dirname, '../public/edit.html');
        res.sendFile(editPagePath);
    }
    static loginPage(req: Request,res: Response) {
        const editPagePath = path.join(__dirname, '../public/login.html');
        res.sendFile(editPagePath);
    }
}
export default UserController;