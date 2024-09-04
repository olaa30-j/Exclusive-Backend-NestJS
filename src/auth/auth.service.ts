/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domains/user/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
        }

        const payload = { role: user.role, name: user.name, email: user.email, sub: user._id }; 
        const userToken = this.jwtService.sign(payload);

        return { access_token: userToken };
    }
}
