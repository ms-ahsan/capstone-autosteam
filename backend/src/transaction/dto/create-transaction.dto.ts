import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DetailTransactionDto } from './transaction/detail_transaction.dts';
import { CustomerDto } from './transaction/customer.dto';

export class CreateTransactionDto {
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
