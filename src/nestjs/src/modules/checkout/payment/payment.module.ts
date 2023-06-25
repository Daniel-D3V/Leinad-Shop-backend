import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';

@Module({
  controllers: [PaymentController],
  providers: []
})
export class PaymentModule {}
