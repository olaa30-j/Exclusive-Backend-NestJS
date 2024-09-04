/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './role.enum';


@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    age: number;

    @Prop()
    address: [string];

    @Prop()
    orders:[object];

    @Prop({default: Role.USER})
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
