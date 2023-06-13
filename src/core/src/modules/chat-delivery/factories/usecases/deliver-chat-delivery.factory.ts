import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { PrismaChatDeliveryRepository } from "../../infra/repositories/prisma/prisma-chat-delivery.repository";
import { DeliverChatDeliveryUsecaseInterface } from "../../domain/usecases/deliver-chat-delivery.usecase.interface";
import { DeliverChatDeliveryUsecase } from "../../application/usecase/deliver-chat-delivery/deliver-chat-delivery.usecase";

export class DeliverChatDeliveryFactory {

    static create(): DeliverChatDeliveryUsecaseInterface {

        const execute = async (input: DeliverChatDeliveryUsecaseInterface.InputDto): Promise<DeliverChatDeliveryUsecaseInterface.OutputDto> => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaChatDeliveryRepository = new PrismaChatDeliveryRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const deliverChatDeliveryUsecase = new DeliverChatDeliveryUsecase(prismaChatDeliveryRepository, outboxEmitter)
                return await deliverChatDeliveryUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}