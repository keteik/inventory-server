import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { TokenType, IUser, User } from '../models/user.model';

class UserService {
    generateToken(payload: string, tokenType: TokenType): string {
        /* Check if required env variables are provided */
        if(!process.env.SECRET)
            throw new Error("Secret key is not provided!");
        if(!process.env.TOKEN_EXPIRATION)
            throw new Error("Token expiration time key is not provided!");
        if(!process.env.REFRESH_TOKEN_EXPIRATION)
            throw new Error("Refresh token expiration time is not provided!");

        if(tokenType === TokenType.token) /* Check token type */
            return jwt.sign({ name: payload },  process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION }); /* Generate refresh token */
            
        return jwt.sign({ name: payload },  process.env.SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }); /* Generate token */
    }

    async createUser(user: IUser): Promise<IUser> {
        return new User(user).save();
    }

    async getUserById(id: mongoose.Types.ObjectId): Promise<IUser | null> {
        return User.findById(id, {
            password: 0,
            __v: 0
        });
    }

    async getUserByName(name: string): Promise<IUser | null> {
        return User.findOne({ name: name }, {
            password: 0,
            __v: 0
        });
    }

    async getUsers(): Promise<IUser [] | null> {
        return User.find({}, {
            password: 0,
            __v: 0
        });  
    }
}

export default  new UserService();
