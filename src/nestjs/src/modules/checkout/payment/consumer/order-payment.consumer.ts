import { Controller, OnModuleInit } from "@nestjs/common";
import { Message } from "amqplib";
import { RabbitMQService } from "src/services/rabbitmq/rabbitmq.service";
import { 
  CreateOrderPaymentUsecaseFactory,
  SetMercadopagoProviderUsecaseFactory
} from "@core/domain/dist/src/modules/checkout/payment/order-payment/factories"

@Controller()
export class OrderPaymentConsumer implements OnModuleInit {

    constructor(
        private readonly rabbitMqService: RabbitMQService
    ){}

    setupCreateOrderPaymentConsumer() {
        const exchange = "OrderPlacedEventExchange"
        this.rabbitMqService.setupConsumer({
            exchange,
            queue: "create-order-payment-queue"        
        }, this.createOrderPayment)                
    }

    setupSetMercadopagoProviderConsumer() {
        const exchange = "MercadopagoPaymentGeneratedEventExchange"
        this.rabbitMqService.setupConsumer({
            exchange,
            queue: "set-mercadopago-provider-queue"        
        }, this.setMercadopagoProvider)
    }
      
    onModuleInit(): void {
        this.setupCreateOrderPaymentConsumer()
        this.setupSetMercadopagoProviderConsumer()
    }          
    //fdsfdfdsfd
    async setMercadopagoProvider(message: Message) {
        const content = RabbitMQService.getContentFromMessage(message)
        const usecase = SetMercadopagoProviderUsecaseFactory.create()
        await usecase.execute({
            mercadopagoProviderId: content.payload.id,
            orderPaymentId: content.payload.orderPaymentId
        })
    }

    async createOrderPayment(message: Message) {
        const content = RabbitMQService.getContentFromMessage(message)
        const usecase = CreateOrderPaymentUsecaseFactory.create()
        await usecase.execute({
          orderId: content.payload.id,
          userId: content.payload.customerId
        })
    }
}