import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateOrderPaymentUsecaseInterface } from "../../domain/usecases";
import { CreateOrderPaymentUsecase } from "../../application/usecases";
import { PrismaOrderPaymentRepository, PrismaOrderPaymentCustomerRepository } from "../../infra/repositories";

export class CreateOrderPaymentUsecaseFactory {

    static create(): CreateOrderPaymentUsecaseInterface {

        const execute = async (input: CreateOrderPaymentUsecaseInterface.InputDto): Promise<CreateOrderPaymentUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaOrderPaymentCustomerRepository = new PrismaOrderPaymentCustomerRepository(prisma as PrismaClient)
                const prismaOrderPaymentRepository = new PrismaOrderPaymentRepository(
                    prisma as PrismaClient,
                    prismaOrderPaymentCustomerRepository
                )
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createOrderPaymentUsecase = new CreateOrderPaymentUsecase(
                    prismaOrderPaymentRepository,
                    prismaOrderPaymentCustomerRepository,
                    outboxEmitter
                )
                return await createOrderPaymentUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}