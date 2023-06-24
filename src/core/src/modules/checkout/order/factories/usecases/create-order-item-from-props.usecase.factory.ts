import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import { CreateOrderItemFromPropsUsecaseInterface } from "../../domain/usecases"
import { CreateOrderItemsFromPropsUsecase } from "../../application/usecases"
import { AnnounceFacadeFactory } from "@/modules/announce/announce-management/factories"

export class CreateOrderItemFromPropsUsecaseFactory {

    static create(): CreateOrderItemFromPropsUsecaseInterface {

        const execute = async (input: CreateOrderItemFromPropsUsecaseInterface.InputDto): Promise<CreateOrderItemFromPropsUsecaseInterface.OutputDto> => {
            return await prismaClient.$transaction(async (prisma) => {
                const announceFacade = AnnounceFacadeFactory.create(prisma as PrismaClient)
                const createOrderItemsFromPropsUsecase = new CreateOrderItemsFromPropsUsecase(announceFacade)
                return await createOrderItemsFromPropsUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}