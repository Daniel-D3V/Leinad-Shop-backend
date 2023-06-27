import { Module } from '@nestjs/common';
import { OrderPaymentConsumer } from "./order-payment.consumer"
import { MercadopagoProviderController } from "./mercadopago-provider.controller"
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';

@Module({
  controllers: [OrderPaymentConsumer, MercadopagoProviderController],
  providers: [
    RabbitMQService
  ]
})
export class PaymentModule {}
