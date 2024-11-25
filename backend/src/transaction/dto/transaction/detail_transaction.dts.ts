import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { VehicleDto } from './vehicle.dto';

export class DetailTransactionDto {
  @IsNumber()
  product_id: number;

  @IsString()
  product_code: string;

  @IsString()
  product_name: string;

  @IsString()
  product_type: string;

  @IsOptional()
  @IsNumber()
  customer_vehicle_id: number | null;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  total_price: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleDto)
  vehicles?: VehicleDto[] | null;
}
