import { Request, Response, Router } from "express";
import { saveUser } from "../controllers/user.controller";

//const router = Router();

export const userRouter = Router()
    .get('/')
    .post('/', (req: Request, res: Response) => {
        return saveUser(req, res);
    })
    .put('/')
    .delete('/')

