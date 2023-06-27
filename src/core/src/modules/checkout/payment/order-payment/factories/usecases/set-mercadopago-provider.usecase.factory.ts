import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { SetMercadopagoProviderUsecaseInterface } from "../../domain/usecases";
import { SetMercadopagoProviderUsecase  } from "../../application/usecases";
import { PrismaOrderPaymentRepositoryFactory } from "../utils";

export class SetMercadopagoProviderUsecaseFactory {

    static create(): SetMercadopagoProviderUsecaseInterface {

        const execute = async (input: SetMercadopagoProviderUsecaseInterface.InputDto): Promise<SetMercadopagoProviderUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaOrderPaymentCustomerRepository = PrismaOrderPaymentRepositoryFactory.create(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const setMercadopagoProviderUsecase = new SetMercadopagoProviderUsecase(
                    prismaOrderPaymentCustomerRepository,
                    outboxEmitter
                )
                return await setMercadopagoProviderUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}