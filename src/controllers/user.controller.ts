import {  Request, Response } from 'express';
import { IUser, TokenType } from '../models/user.model';
import  UserService  from '../services/user.service';
import  bcrypt from 'bcrypt';
import mongoose  from 'mongoose';
import { generateToken } from '../middleware/auth';

class UserController {

    async saveUser(req: Request, res: Response): Promise<Response> {
        const userBody: IUser = req.body;
        const findUser: IUser | null = await  UserService.getUserByName(userBody.name); /* Check if user already exists in DB */

        if(findUser)
            return res.status(409).send({ status: "failed", err: "User already exists!"});
    
        try{
            const token: string = generateToken(userBody.name, TokenType.token); 
            const refreshToken: string = generateToken(userBody.name, TokenType.refreshToken); 
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
            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.id); /* Create userId object from given id to match 
                                                                                                    default _id property of type ObjectId in DB */
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
            const findUsers: IUser [] = await UserService.getUsers();
            
            return res.status(200).send({ status: "sucess", users: findUsers });
        } catch(err: any) {
            return res.status(500).send({ status: "failed", message: err.message})
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.id); /* Create userId object from given id to match 
                                                                                                 default _id property of type ObjectId in DB */
            const updatedUser: IUser | null = await UserService.updateUserName(userId, req.body.name);
            
            if(!updatedUser)
                return res.status(404).send({ status: "failed", message: "User not found!" });
            
            return res.status(200).send({ status: "success", updatedUser: updatedUser});
        } catch(err: any) {
            return res.status(500).send({ status: "failed", message: err.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.id); /* Create userId object from given id to match 
                                                                                                default _id property of type ObjectId in DB */
            const deletedUser = await UserService.deleteUser(userId);
            if(!deletedUser)
                    return res.status(404).send({ status: "failed", message: "User not found!" });
            return res.status(200).send({ status: "success", deletedUser: deletedUser});    
        } catch(err: any) {
            return res.status(500).send({ status: "failed", message: err.message });
        }
    }
}
 
export default new UserController();