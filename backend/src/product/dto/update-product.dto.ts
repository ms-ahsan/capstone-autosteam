import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { File } from 'multer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  code: string | null;

  @IsOptional()
  image_file: File | null;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumberString()
  @IsNotEmpty()
  stock: number;
}
