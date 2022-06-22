import { Request, Response } from 'express';
import { IUser, TokenType } from '../models/user.model';
import  UserService  from '../services/user.service';

export async function saveUser(req: Request, res: Response): Promise<Response> {
    const userBody: IUser = req.body;

    if(!process.env.SECRET)
        return res.status(404).send({ status: "failed",  err: "Secret key is not provided!"})

    try{
        const token: string  = UserService.generateToken(userBody.name, TokenType.token);
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
