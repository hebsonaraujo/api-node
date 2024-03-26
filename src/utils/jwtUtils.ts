import jwt from 'jsonwebtoken';
import jsonSecret from '../config/jsonSecret';

export const verifyToken = (token: string) : any => {
    try {
        return jwt.verify(token, jsonSecret.secret);
    } catch(error) {
        throw new Error('Invalid token');
    }
}
interface User {
    id: number,
    name: string,
    mail: string
}
export const generateAccessToken = (userData: User) : string => {
    return jwt.sign(userData, jsonSecret.secret, { expiresIn: 86400});
}