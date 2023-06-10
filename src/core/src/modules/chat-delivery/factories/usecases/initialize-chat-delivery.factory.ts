import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { FinishChatDeliveryUsecaseInterface } from "../../domain/usecases/finish-chat-delivery.usecase.interface copy";
import { PrismaChatDeliveryRepository } from "../../infra/repositories/prisma/prisma-chat-delivery.repository";
import { InitializeChatDeliveryUsecase } from "../../application/usecase/initialize-chat-delivery/initialize-chat-delivery.usecase";
import { InitializeChatDeliveryUsecaseInterface } from "../../domain/usecases/initilize-chat-delivery-usecase.interface";

export class InitializeChatDeliveryFactory {

    static create(): InitializeChatDeliveryUsecaseInterface {

        const execute = async (input: InitializeChatDeliveryUsecaseInterface.InputDto): Promise<InitializeChatDeliveryUsecaseInterface.OutputDto> => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaChatDeliveryRepository = new PrismaChatDeliveryRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const initializeChatDeliveryUsecase = new InitializeChatDeliveryUsecase(prismaChatDeliveryRepository, outboxEmitter)
                return await initializeChatDeliveryUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}