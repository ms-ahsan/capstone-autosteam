import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  account_number: number;

  @IsString()
  @IsNotEmpty()
  an_account_number: string;
}
