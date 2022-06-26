import { Router } from "express";
import AuthController from '../controllers/auth.controller';

export const authRouter = Router()
    .post('/', AuthController.authUser)
    .post('/token/:id', AuthController.generateNewToken);