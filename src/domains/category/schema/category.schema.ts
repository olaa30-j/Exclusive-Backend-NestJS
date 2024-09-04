/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Category extends Document {
    @Prop({ required: true })
    name: string;
}

export const categorySchema = SchemaFactory.createForClass(Category);
