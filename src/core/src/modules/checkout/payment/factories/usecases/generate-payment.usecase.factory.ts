import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { GeneratePaymentUsecaseInterface } from "../../domain/usecases";
import { GeneratePaymentUsecase } from "../../application/usecases";
import { PrismaCustomerRepository, PrismaPaymentRepository } from "../../infra/repositories";
import { MercadopagoGateway } from "../../infra/gateways";


export class GeneratePaymentUsecaseFactory {

    static create(): GeneratePaymentUsecaseInterface {

        const execute = async (input: GeneratePaymentUsecaseInterface.InputDto): Promise<GeneratePaymentUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaCustomerRepository = new PrismaCustomerRepository(prisma as PrismaClient)
                const prismaPaymentRepository = new PrismaPaymentRepository(
                    prisma as PrismaClient,
                    prismaCustomerRepository
                )
                const mercacadoPagoGateway = new MercadopagoGateway()
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const generatePaymentUsecase = new GeneratePaymentUsecase(
                    prismaPaymentRepository,
                    prismaCustomerRepository,
                    mercacadoPagoGateway,
                     outboxEmitter
                )
                return await generatePaymentUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}