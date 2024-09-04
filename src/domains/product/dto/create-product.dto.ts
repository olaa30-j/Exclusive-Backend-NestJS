/* eslint-disable prettier/prettier */
import { 
    IsNotEmpty, 
    IsString, 
    IsPositive, 
    IsNumber, 
    IsBoolean, 
    IsArray, 
    MinLength, 
    IsMongoId, 
    IsOptional, 
    IsObject
} from 'class-validator';

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    name: string;

    @IsNotEmpty()
    @IsString()
    brand_code: string;

    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsNotEmpty()
    @IsObject()
    plp_specifications: object;

    @IsNotEmpty()
    @IsString()
    image_key: string;

    @IsArray()
    @IsString({ each: true }) 
    image_keys: string[];

    @IsNotEmpty()
    @IsNumber()
    @IsPositive() 
    price: number;

    @IsOptional() 
    @IsNumber()
    @IsPositive()
    price_discount: number;

    @IsNumber()
    @IsPositive()
    quatity:number

    @IsNotEmpty()
    @IsBoolean()
    is_bestseller: boolean;

    @IsNotEmpty()
    @IsMongoId()
    category: string;
}
