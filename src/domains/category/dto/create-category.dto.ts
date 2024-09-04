/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}
