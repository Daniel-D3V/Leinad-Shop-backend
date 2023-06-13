import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { FinishChatDeliveryUsecaseInterface } from "../../domain/usecases/finish-chat-delivery.usecase.interface copy";
import { PrismaChatDeliveryRepository } from "../../infra/repositories/prisma/prisma-chat-delivery.repository";
import { FinishChatDeliveryUsecase } from "../../application/usecase/finish-chat-delivery/finish-chat-delivery.usecase";

export class FinsihChatDeliveryFactory {

    static create(): FinishChatDeliveryUsecaseInterface {

        const execute = async (input: FinishChatDeliveryUsecaseInterface.InputDto): Promise<FinishChatDeliveryUsecaseInterface.OutputDto> => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaChatDeliveryRepository = new PrismaChatDeliveryRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const finishChatDeliveryUsecase = new FinishChatDeliveryUsecase(prismaChatDeliveryRepository, outboxEmitter)
                return await finishChatDeliveryUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}