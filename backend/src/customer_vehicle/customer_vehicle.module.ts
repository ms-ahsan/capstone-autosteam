import { Module } from '@nestjs/common';
import { CustomerVehicleService } from './customer_vehicle.service';
import { CustomerVehicleController } from './customer_vehicle.controller';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [CustomerVehicleController],
  providers: [CustomerVehicleService, JwtStrategy],
})
export class CustomerVehicleModule {}
