import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {  PrismaClient } from "@prisma/client"
import { OutboxEmitter } from "@/modules/@shared/infra/providers"
import { PlaceOrderUsecaseInterface } from "../../domain/usecases"
import { PlaceOrderUsecase } from "../../application/usecases"
import { PrismaOrderRepository } from "../../infra/repositories"

export class PlaceOrderUsecaseFactory {

    static create(): PlaceOrderUsecaseInterface {

        const execute = async (input: PlaceOrderUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaOrderRepository = new PrismaOrderRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const placeOrderUsecase = new PlaceOrderUsecase(prismaOrderRepository, outboxEmitter)
                return await placeOrderUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}