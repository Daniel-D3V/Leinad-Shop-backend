import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { MercadopagoProviderController } from "./mercadopago-provider.controller"

@Module({
  controllers: [PaymentController, MercadopagoProviderController],
  providers: []
})
export class PaymentModule {}
