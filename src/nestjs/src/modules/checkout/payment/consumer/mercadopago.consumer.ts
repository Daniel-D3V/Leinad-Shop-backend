import { Controller, Logger, OnModuleInit } from "@nestjs/common";
import { Message } from "amqplib";
import { RabbitMQService } from "src/services/rabbitmq/rabbitmq.service";
import { 
  CancelMercadopagoPaymentUsecaseFactory
} from "@core/domain/dist/src/modules/checkout/payment/mercadopago-provider/factory"

@Controller()
export class MercadopagoConsumer implements OnModuleInit {

    private readonly logger = new Logger();

    constructor(
        private readonly rabbitMqService: RabbitMQService
    ){}

    // setupCancelPaymentConsumer() {
    //     const exchange = "orderPaymentMercadopagoAssignmentFailureEventExchange"
    //     this.rabbitMqService.setupConsumer({
    //         exchange,
    //         queue: "cancel-mercadopago-payment-if-failed-queue"        
    //     }, this.CancelPayment)                
    // }

    onModuleInit(): void {
        // this.setupCancelPaymentConsumer()
    }          
    //fdsfdfdsf
    // async CancelPayment(message: Message) {
    //     const content = RabbitMQService.getContentFromMessage(message)
    //     this.logger.log(content)
    //     const usecase = CancelMercadopagoPaymentUsecaseFactory.create()
    //     await usecase.execute({
    //         mercadopagoPaymentProviderId: content.payload.mercadopagoProviderId
    //     })
    // }

}