import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CustomerDto {
  @IsOptional()
  @IsNumber()
  id: number | null;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsOptional()
  @IsNumber()
  phone_number: number | null;
}
