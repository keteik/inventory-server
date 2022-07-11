import { Request, Response, NextFunction } from 'express';
import { TokenType } from '../models/user.model';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction): Response | void {
    const bearerToken: string | undefined = req.headers['authorization'];

    if(!bearerToken)
        return res.status(403).send({ status: "failed", message: "Not authenticated!"});
    
    if(!process.env.SECRET) 
        return res.status(400).send({ status: "failed", message: "Secret key is not provided!"});

    try {
        const token: string = bearerToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
                        
        return next();
    } catch(err: any) {
        return res.status(500).send({ status: "failed", message: err.message});
    }
}

/*Generate token based on passed type */
export function generateToken(payload: string, tokenType: TokenType): string {
    /* Check if required env variables are provided */
    if(!process.env.SECRET)
        throw new Error("Secret key is not provided!");
    if(!process.env.TOKEN_EXPIRATION)
        throw new Error("Token expiration time key is not provided!");
    if(!process.env.REFRESH_TOKEN_EXPIRATION)
        throw new Error("Refresh token expiration time is not provided!");

    if(tokenType === TokenType.token) /* Check token type */
        return jwt.sign({ name: payload },  process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
        
    return jwt.sign({ name: payload },  process.env.SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
}