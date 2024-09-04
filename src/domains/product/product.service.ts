/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Product } from './schema/product.schema';
import { CreateProductDTO } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { updateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: mongoose.Model<Product>) { }

    async createProduct(product: CreateProductDTO): Promise<Product> {
        const checkProduct = await this.productModel.findOne({ name: product.name });
        if (checkProduct) {
            throw new Error('Product already exists');
        }

        const newProduct = new this.productModel(product);
        return newProduct.save();
    }

    async getProduct(id: string): Promise<Product> {
        return this.productModel.findById(id);
    }

    async getProducts(): Promise<Product[]> {
        return this.productModel.find();
    }

    async filterProducts(filter: string): Promise<Product[]> {
        const priceFilter = parseFloat(filter);
        const isPriceQuery = !isNaN(priceFilter);

        return this.productModel.aggregate([
            {
                $match: {
                    $or: [
                        { brand_code: { $regex: filter, $options: 'i' } },
                        { price: { $regex: filter, $options: 'i' } },
                        { name: { $regex: filter, $options: 'i' } },
                        ...(isPriceQuery
                            ? [
                                { price: { $eq: priceFilter } }
                            ]
                            : []
                        )
                    ]
                }
            },
            {
                $sort:{
                    price: 1
                }
            }
        ]).exec();
    }

    async updateProduct(id: string, product: updateProductDTO): Promise<Product> {
        const checkProduct = await this.productModel.findOne({ _id: id });
        if (!checkProduct) {
            throw new Error('Product not found');
        }
        return this.productModel.findByIdAndUpdate(id, product, { new: true });
    }

    async deleteProduct(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }
}
