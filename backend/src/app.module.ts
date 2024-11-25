import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { CustomerVehicleModule } from './customer_vehicle/customer_vehicle.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    ProductModule,
    EmployeeModule,
    CustomerModule,
    VehicleModule,
    PaymentMethodModule,
    CustomerVehicleModule,
    TransactionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
