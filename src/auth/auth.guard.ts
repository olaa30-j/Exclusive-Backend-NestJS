/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthGuard implements  CanActivate{
    constructor(private jwtService:JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        const secret = jwtConstants.secret;

        if(!token){
            throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, 'Invalid token');
        }

        if (token) {
            const payload = this.jwtService.verify(token,{secret});
            if(payload){
                return payload;
            }
        } 
        return false;
    }

    private extractTokenFromRequest(request: Request): string {
        return request.headers.authorization;
    }
}

