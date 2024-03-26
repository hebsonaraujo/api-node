import { Request, Response, NextFunction } from 'express'
class ErrorMiddleware {
    static handler404(req: Request,res: Response,next: NextFunction) {
        res.status(404).send({ message: "error 404" });
        next();
    }
}
export default ErrorMiddleware;