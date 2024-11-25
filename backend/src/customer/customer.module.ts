import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, JwtStrategy],
})
export class CustomerModule {}
