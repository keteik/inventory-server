import mongoose from 'mongoose';
import { IUser, User } from '../models/user.model';

class UserService {

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
            __v: 0
        });
    }

    async getUsers(): Promise<IUser []> {
        return User.find({}, {
            password: 0,
            __v: 0
        });  
    }
    async updateUserName(id: mongoose.Types.ObjectId, newName: string): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, { name: newName }, { 
            projection: {
                password: 0,
                __v: 0
            }, new: true 
        });
    }

    async updateRefreshToken(id: mongoose.Schema.Types.ObjectId, newRefreshToken: string): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, { refreshToken: newRefreshToken }, { 
            projection: {
                password: 0,
                __v: 0
            }, new: true 
        });
    }

    async deleteUser(id: mongoose.Types.ObjectId): Promise<IUser | null> {
        return User.findByIdAndDelete(id, {
           projection: {
                password: 0,
                __v: 0
           }
        })
    }
}

export default  new UserService();
