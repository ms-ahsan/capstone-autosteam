import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, JwtStrategy],
})
export class EmployeeModule {}
