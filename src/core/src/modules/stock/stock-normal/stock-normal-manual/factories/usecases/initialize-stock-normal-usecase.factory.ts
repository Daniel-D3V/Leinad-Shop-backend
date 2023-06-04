
import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { Prisma, PrismaClient } from "@prisma/client";
import { InitializeStockNormalUsecaseInterface } from "../../domain/usecases";
import { InitializeStockNormalUsecase } from "../../application/usecases";
import { PrismaStockNormalRepository } from "../../infra/repositories";
import { RegisterEventConsumptionUsecase } from "@/modules/event-sourcing-management/application/usecases";
import { left } from "@/modules/@shared/logic";
import { PrismaEventConsumerRepository } from "@/modules/event-sourcing-management/infra/repositories";

export class InitializeStockNormalUsecaseFactory {

    static create({ consumerName, eventId }: { eventId: string, consumerName: string }): InitializeStockNormalUsecaseInterface {
        
        const execute = async (input: InitializeStockNormalUsecaseInterface.InputDto): Promise<InitializeStockNormalUsecaseInterface.OutputDto> => {
            
            return await prismaClient.$transaction(async (prisma) => {
                const prismaEventConsumerRepository = new PrismaEventConsumerRepository(prisma as PrismaClient)
                const registerEventConsumptionUsecase = new RegisterEventConsumptionUsecase(prismaEventConsumerRepository)
                const registerEventConsumptionOutput = await registerEventConsumptionUsecase.execute({
                    consumerName,
                    eventId
                })
                if(registerEventConsumptionOutput.isLeft()) {
                    return left(registerEventConsumptionOutput.value)
                }
                const prismaStockNormalRepository = new PrismaStockNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const initializeStockNormalUsecase = new InitializeStockNormalUsecase(prismaStockNormalRepository, outboxEmitter)
                return await initializeStockNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}