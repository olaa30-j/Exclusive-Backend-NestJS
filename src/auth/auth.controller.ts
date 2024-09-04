/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { email: string; password: string }, @Res({ passthrough: true }) response: Response): Promise<{ access_token: string }> {
        const { email, password } = body;
        const logged = await this.authService.signIn(email, password);

        response.cookie('access_token', logged.access_token, {
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict',
        });

        return logged
    }
}
