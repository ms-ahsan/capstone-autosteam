import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { PaymentMethodController } from './payment_method.controller';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, JwtStrategy],
})
export class PaymentMethodModule {}
