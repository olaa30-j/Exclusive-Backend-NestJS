/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ collection: 'products', timestamps: true })
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  brand_code: string;

  @Prop()
  brand: string;

  @Prop({ type: Object }) 
  plp_specifications: Record<string, any>;

  @Prop()
  image_key: string;

  @Prop([String])
  image_keys: string[];

  @Prop()
  price: number;

  @Prop()
  price_discount: number;

  @Prop()
  quantity:number

  @Prop({default: false})
  is_bestseller: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: mongoose.Schema.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// //////////////////////////////////////////////////////////////////////////////////////////// //
ProductSchema.pre('save', function (next) {
  if (this.isModified('price')) {
    this.price_discount = this.price * 0.9; 
  }
  next();
});

// //////////////////////////////////////////////////////////////////////////////////////////////// //
