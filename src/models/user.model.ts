import  mongoose, { ObjectId } from "mongoose"; 

export interface IUser {
    _id: ObjectId;
    name: string;
    password: string;
    refreshToken: string;
    createdAt: Date;
}

export enum TokenType {
    token,
    refreshToken
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true, },
    password: { type: String, required: true },
    refreshToken: { type: String, required: true }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
