import { Controller, OnModuleInit } from "@nestjs/common";
import { Message } from "amqplib";
import { RabbitMQService } from "src/services/rabbitmq/rabbitmq.service";
import { 
    VerifyEmailUsecaseFactory
} from "@core/domain/dist/src/modules/auth/main/factories"

@Controller()
export class VerifyEmailConsumer implements OnModuleInit {

    constructor(
        private readonly rabbitMqService: RabbitMQService
    ){}

    onModuleInit(): void {
        const exchange = "EmailVerifiedEventExchange"
        this.rabbitMqService.setupConsumer({
            exchange,
            queue: "verify-user-email-queue"        
        }, this.verifyEmail)                
    }                                                   

    async verifyEmail(message: Message) {
        const content = RabbitMQService.getContentFromMessage(message)
        const usecase = VerifyEmailUsecaseFactory.create()
        await usecase.execute({
            userId: content.payload.userId
        })
    }
}