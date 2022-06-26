import mongoose from 'mongoose';
import { IUser, User } from '../models/user.model';

class UserService {

    /* Save given user to DB and return created one */
    async createUser(user: IUser): Promise<IUser> {
        return new User(user).save();
    }

    /* Return user from DB based on the given id */
    async getUserById(id: mongoose.Types.ObjectId): Promise<IUser | null> {
        return User.findById(id, {
            password: 0,
            __v: 0
        });
    }

    /* Return user from DB based on the given name */
    async getUserByName(name: string): Promise<IUser | null> {
        return User.findOne({ name: name }, {
            __v: 0
        });
    }

    /* Return all users from DB */
    async getUsers(): Promise<IUser [] | null> {
        return User.find({}, {
            password: 0,
            __v: 0
        });  
    }
    /* Update and return user name from DB*/
    async updateUserName(id: mongoose.Types.ObjectId, newName: string): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, { name: newName }, { 
            projection: {
                password: 0,
                __v: 0
            }, new: true 
        });
    }

    /* Update and return refreshToken from DB*/
    async updateRefreshToken(id: mongoose.Schema.Types.ObjectId, newRefreshToken: string): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, { refreshToken: newRefreshToken }, { 
            projection: {
                password: 0,
                __v: 0
            }, new: true 
        });
    }

    /* Delete and return user from DB */ 
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
