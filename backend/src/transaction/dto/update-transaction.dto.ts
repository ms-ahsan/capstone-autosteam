import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CustomerDto } from './transaction/customer.dto';
import { DetailTransactionDto } from './transaction/detail_transaction.dts';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsOptional()
  @IsString()
  code_transaction: string | null;

  @IsNumber()
  grand_total: number;

  @IsNumber()
  payment_method_id: number;

  @IsNumber()
  total_payment: number;

  @IsNumber()
  money_changes: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailTransactionDto)
  detail_transactions: DetailTransactionDto[];

  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @IsString()
  employees_array_text: string;
}
