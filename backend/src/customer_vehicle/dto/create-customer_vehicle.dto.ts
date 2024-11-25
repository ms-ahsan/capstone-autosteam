import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateCustomerVehicleDto {
  @IsNumberString()
  @IsNotEmpty()
  customer_id: number;

  @IsNumberString()
  @IsNotEmpty()
  vehicle_id: number;
}
