import { Controller, OnModuleInit } from "@nestjs/common";
import { Message } from "amqplib";
import { RabbitMQService } from "src/services/rabbitmq/rabbitmq.service";
import { 
  CreateOrderPaymentUsecaseFactory
} from "@core/domain/dist/src/modules/checkout/payment/order-payment/factories"

@Controller()
export class OrderPaymentConsumer implements OnModuleInit {

    constructor(
        private readonly rabbitMqService: RabbitMQService
    ){}

    onModuleInit(): void {
        const exchange = "OrderPlacedEventExchange"
        this.rabbitMqService.setupConsumer({
            exchange,
            queue: "create-order-payment-queue"        
        }, this.createOrderPayment)                
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