/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
// import { Category } from '../category/schema/category.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() product: CreateProductDTO){
    return this.productService.createProduct(product);
  }

  @Get('filter')
  async filterProducts(
    @Query('term') filter:string,
  ){
    return this.productService.filterProducts(filter);
  }

  @Get('get/:id')
  getProduct(@Param('id') id:string){
    return this.productService.getProduct(id);
  }

  @Get()
  getAllProducts(){
    return this.productService.getProducts();
  }

  @Patch(':id')
  updateProduct(@Param('id') id:string, @Body() product: CreateProductDTO){
    return this.productService.updateProduct(id,product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
