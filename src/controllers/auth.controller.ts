import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import UserService from "../services/user.service";
import bcrypt from 'bcrypt';
import { TokenType } from "../models/user.model";
import { generateToken } from "../middleware/auth";
import mongoose from "mongoose";

class AuthController {
    async authUser(req: Request, res: Response): Promise<Response> {
        const userCredentials: { name: string, password: string } =  req.body;

        if(!(userCredentials.name && userCredentials.password)) /* Check corrent input */
            return res.status(400).send({ status: "failed", message: "Invalid input"});

        try {
            const findUser: IUser | null = await UserService.getUserByName(userCredentials.name);

            if(!findUser)
                return res.status(404).send({ status: "failed", message: "User not found!"});
            
            const checkPassword: boolean = await bcrypt.compare(userCredentials.password, findUser.password); /* Check password */

            if(!checkPassword)
                return res.status(401).send({ status: "failed", message: "Password is incorrect!"});
            
            /* Generate tokens */
            const token: string = generateToken((findUser._id).toString(), TokenType.token);
            const refreshtoken: string = generateToken((findUser._id).toString(), TokenType.refreshToken);

            const updatedUser: IUser | null = await UserService.updateRefreshToken(findUser._id, refreshtoken); /* Update refresh token in DB */

            if(!updatedUser)
                return res.status(404).send({ status: "failed", message: "User not found!" });

            /* Return user and tokens */
            return res.status(200).send({ status: "success", user: {
                id: updatedUser._id,
                name: updatedUser.name,
                token: token,
                refreshtoken: updatedUser.refreshToken
            }});
        } catch (err: any) {
            return res.status(500).send({ status: "failed", message: err.message });
        }
    }

    async generateNewToken(req: Request, res: Response): Promise<Response> {
        const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.id); /* Create userId object from given id to match 
                                                                                                default _id property of type ObjectId in DB */
        const refreshToken: string = req.body.refreshToken;

        if(!refreshToken)
            return res.status(400).send({ status: "failed", message: "Invalid input"} );

        try {
            const findUser: IUser | null = await UserService.getUserById(userId);

            if(!findUser)
                return res.status(404).send({ status: "failed", message: "User not found!" });
            
            if(refreshToken !== findUser.refreshToken )
                return res.status(401).send({ status: "failed", message: "Refresh token is invalid!"});

            const newToken: string = generateToken((findUser._id).toString(), TokenType.token); /* Generate new token */

           return res.status(200).send({ status: "success", user: {
                id: findUser._id,
                name: findUser.name,
                token: newToken
           }});
        } catch(err: any) {
            return res.status(500).send({ status: "failed", message: err.message });
        }
    }
}

export default new AuthController();