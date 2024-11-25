import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { File } from 'multer';

export class CreateProductDto {
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
