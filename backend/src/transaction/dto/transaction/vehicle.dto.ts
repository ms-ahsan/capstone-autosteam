import { IsNumber, IsOptional, IsString } from 'class-validator';

export class VehicleDto {
  @IsOptional()
  @IsNumber()
  id: number | null;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsOptional()
  @IsString()
  type: string | null;

  @IsOptional()
  @IsString()
  plate_number: string | null;
}
