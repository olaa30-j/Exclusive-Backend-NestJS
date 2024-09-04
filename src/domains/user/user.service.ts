/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    private users: any[] = [];

    constructor(@InjectModel(User.name) private readonly userModel:mongoose.Model<User>){}
    getUsers(){
        // return this.users
        return this.userModel.find();
    }

    getUser(id: string):Promise<User>{
        // return this.users.find({email: email});
        const userData = this.userModel.findById( id );
        return userData;
    }

    async createUser(user: CreateUserDto): Promise<User> {

        const { name, email, age, password, role } = user;

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await this.userModel.create({
            name,
            email,
            age,
            password: hashedPassword,
            role: role? role : 'user'
        });
    
        return newUser;
    }

    async updateUser(id:string ,user:updateUserDto): Promise<User>{

        const { name, email, age, password, role } = user;
        const userUpdate = await this.userModel.findByIdAndUpdate(
            id, 
            { name, email, age, password, role}, 
            {new: true}
        )

        if(!userUpdate){
            throw new Error('Update User Failed')
        }
        return userUpdate;
    }

    async deleteUser(id:string){
        return await this.userModel.findByIdAndDelete(id);
    }
}
