import { Router } from "express";
import  UserController  from "../controllers/user.controller";

export const userRouter = Router()
    .get('/', UserController.getUsers)
    .get('/:id', UserController.getUser)
    .post('/', UserController.saveUser)
    .put('/:id', UserController.updateUser)
    .delete('/:id', UserController.deleteUser);

