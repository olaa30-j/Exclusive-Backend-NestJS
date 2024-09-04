/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryModel:mongoose.Model<Category>) {}


  async create(category: CreateCategoryDto):Promise<Category>{
    const { name } = category;
    const categoryExist = await this.categoryModel.findOne({ name });

    if(categoryExist){
      throw new Error('Category already exists');
    }else{
      const createCategory = new this.categoryModel({ name });
      return createCategory.save() ;
      }
  }

  findAll():Promise<Category[]>{
    return this.categoryModel.find().exec();
  }

  async findCategory(id: string): Promise<Category>{
    const category = await this.categoryModel.findById(id);
    return category;
  }

  async update(id: string, category: UpdateCategoryDto): Promise<Category>{
    if(category){
      const updateCategory = await this.categoryModel.findByIdAndUpdate(id, category, {new: true});
      if(updateCategory){
        return updateCategory;
      }else{
        return null;
      }
    }
  }

  async remove(id: string){
    const deleteCategory = await this.categoryModel.findByIdAndDelete(id);
    if(deleteCategory){
      return deleteCategory;
    }
  }
}
