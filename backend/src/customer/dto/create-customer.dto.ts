import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  phone_number: number;
}
