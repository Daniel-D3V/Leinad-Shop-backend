import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import {  CreateProductStockNormalUsecase } from "@/modules/product-stock/application/usecases"
import { PrismaProductStockAutoRepository, PrismaProductStockNormalRepository, PrismaProductStockRepository } from "@/modules/product-stock/infra/repositories"
import { CreateProductStockNormalUsecaseInterface } from "@/modules/product-stock/domain/usecases/normal"
import { RegisterEventConsumptionUsecase } from "@/modules/event-sourcing-management/application/usecases"
import { PrismaEventConsumerRepository } from "@/modules/event-sourcing-management/infra/repositories"
import { left } from "@/modules/@shared/logic"

export class CreateProductStockNormalUsecaseFactory {

    static create({consumerName, eventId}:{ consumerName: string, eventId: string } ): CreateProductStockNormalUsecaseInterface {

        const execute = async (input: CreateProductStockNormalUsecaseInterface.InputDto): Promise<CreateProductStockNormalUsecaseInterface.OutputDto>  => {
            return await prismaClient.$transaction(async (prisma) => {
                
                const prismaEventConsumerRepository = new PrismaEventConsumerRepository(prisma as PrismaClient)
                const registerEventConsumptionUsecase = new RegisterEventConsumptionUsecase(prismaEventConsumerRepository) 
                const registerEventConsumptionResult = await registerEventConsumptionUsecase.execute({
                    consumerName,
                    eventId
                })
                if(registerEventConsumptionResult.isLeft()) {
                    return left(registerEventConsumptionResult.value)
                }

                const prismaProductStockRepository = new PrismaProductStockRepository(prisma as PrismaClient)
                const prismaProductStockNormalRepository = new PrismaProductStockNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createProductStockNormalUsecase = new CreateProductStockNormalUsecase( prismaProductStockRepository, prismaProductStockNormalRepository, outboxEmitter)
                return await createProductStockNormalUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}