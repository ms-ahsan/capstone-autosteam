import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, JwtStrategy],
})
export class VehicleModule {}
