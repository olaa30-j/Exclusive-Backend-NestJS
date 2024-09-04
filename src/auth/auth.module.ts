/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/domains/user/schemas/user.schema';
import { UserController } from 'src/domains/user/user.controller';
import { UserModule } from 'src/domains/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
    UserModule
  ],
  providers: [AuthService],
  controllers: [AuthController, UserController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
