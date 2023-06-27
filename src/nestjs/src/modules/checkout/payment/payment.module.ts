import { Module } from '@nestjs/common';
import { MercadopagoConsumer, OrderPaymentConsumer } from "./consumer"
import { MercadopagoProviderController } from "./mercadopago-provider.controller"
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';

@Module({
  controllers: [
    OrderPaymentConsumer, 
    MercadopagoProviderController,
    MercadopagoConsumer
  ],
  providers: [
    RabbitMQService
  ]
})
export class PaymentModule {}
