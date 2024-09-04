/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from './schemas/role.enum';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){};

    @Get()
    getUsers(){
        return this.userService.getUsers();
    };

    @Get('/user/:id')
    @Roles(Role.USER)
    getUser(@Param('id') id:string){
        return this.userService.getUser(id);
    };

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() user:CreateUserDto){
        return this.userService.createUser(user);
    }

    @Patch(':id')
    @UseGuards()
    updateUser(@Param('id') id:string, @Body() user:updateUserDto){
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    deleteUser(@Param('id') id:string){
        return this.userService.deleteUser(id);
    }
}
