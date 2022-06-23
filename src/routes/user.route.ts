import { Request, Response, Router } from "express";
import  UserController  from "../controllers/user.controller";

//const router = Router();

export const userRouter = Router()
    .get('/', (req: Request, res: Response) => {
        return UserController.getUsers(req, res);
    })
    .get('/:id', (req: Request, res: Response) => {
        return UserController.getUser(req, res);
    })
    .post('/', (req: Request, res: Response) => {
        return UserController.saveUser(req, res);
    })
    .put('/')
    .delete('/')

