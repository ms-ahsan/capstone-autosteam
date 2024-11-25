import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerVehicleDto } from './create-customer_vehicle.dto';
import { IsNumberString, IsNotEmpty } from 'class-validator';

export class UpdateCustomerVehicleDto extends PartialType(
  CreateCustomerVehicleDto,
) {
  @IsNumberString()
  @IsNotEmpty()
  customer_id: number;

  @IsNumberString()
  @IsNotEmpty()
  vehicle_id: number;
}
