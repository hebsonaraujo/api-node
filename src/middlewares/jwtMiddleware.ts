import { NextFunction, Request, Response } from "express";
import jsonSecret from "../config/jsonSecret";
import { verifyToken } from "../utils/jwtUtils";

async function jwtAuth(req: Request,res: Response, next: NextFunction) {
    const cookie = getCookie('jwtToken',req.headers.cookie as string);
    const token = req.headers.authorization?.split(' ')[1] || cookie;
    if(!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    if (!jsonSecret.secret) {
        throw new Error('Chave não definida');
    }
    try {
        const { id, mail, name } = verifyToken(token);
        req.body.userId = id;
        req.body.email = mail;
        req.body.name = name;
        return next()
    } catch(erro) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
}
function getCookie(cname: string,cookie: string) {
    let name = cname + "=";
    let decodedCookie = cookie;
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
export default jwtAuth;