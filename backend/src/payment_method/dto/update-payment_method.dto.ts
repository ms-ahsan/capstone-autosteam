import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentMethodDto } from './create-payment_method.dto';
import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {
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
