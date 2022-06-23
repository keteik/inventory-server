import { Request, Response } from 'express';
import { IUser, TokenType } from '../models/user.model';
import  UserService  from '../services/user.service';
import  bcrypt from 'bcrypt';
import mongoose  from 'mongoose';

class UserController {

    async saveUser(req: Request, res: Response): Promise<Response> {
        const userBody: IUser = req.body;
        const findUser: IUser | null = await  UserService.getUserByName(userBody.name);

        if(findUser)
            return res.status(409).send({ status: "failed", err: "User already exists!"});
    
        if(!process.env.SECRET)
            return res.status(500).send({ status: "failed",  err: "Secret key is not provided!"})
    
        try{
            const token: string = UserService.generateToken(userBody.name, TokenType.token);
            const refreshToken: string = UserService.generateToken(userBody.name, TokenType.refreshToken);
            const hashedPassword = await bcrypt.hash(userBody.password, 10);

            userBody.password = hashedPassword;        
            userBody.refreshToken = refreshToken;
            
            const user: IUser = await UserService.createUser(userBody);
    
            return res.status(200).send({ status: "success", 
                user: {
                    id: user._id,
                    token: token,
                    createdAt: user.createdAt
                }
            });
        } catch(err: any) {
            return res.status(500).send({ status: "failed", err: err.message });
        }
    }

    async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.id);
            const findUser = await UserService.getUserById(userId);
            
            if(!findUser)
                return res.status(404).send({ status: "failed", message: "User not found!" });
            
            return res.status(200).send({ status: "success", user: findUser});
        } catch (err: any) {
            return res.status(200).send({ status: "failed", message: err.message});        
        }
    }

    async getUsers(_: Request, res: Response): Promise<Response> {
        try {
            const findUsers: IUser [] | null = await UserService.getUsers();

            if(!findUsers || findUsers.length === 0)
                return res.status(404).send({ status: "failed", message: "Users not found!" });
            
            return res.status(200).send({ status: "sucess", users: findUsers });
        } catch(err: any) {
            return res.status(500).send({ status: "failed", message: err.message})
        }
    }
}

export default new UserController();