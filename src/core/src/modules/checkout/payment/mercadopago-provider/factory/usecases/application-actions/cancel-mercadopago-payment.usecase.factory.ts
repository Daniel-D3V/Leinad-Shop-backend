import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CancelMercadopagoPaymentUsecase } from "../../../application/usecases";
import { PrismaMercadopagoPaymentProviderRepository } from "../../../infra/repositories";
import { CancelMercadopagoPaymentUsecaseInterface } from "../../../domain/usecases/application-actions";


export class CancelMercadopagoPaymentUsecaseFactory {

    static create(): CancelMercadopagoPaymentUsecaseInterface {

        const execute = async (input: CancelMercadopagoPaymentUsecaseInterface.InputDto): Promise<CancelMercadopagoPaymentUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
               
                const prismaMercadoPagoProviderRepository = new PrismaMercadopagoPaymentProviderRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)


                const cancelMercadopagoPaymentUsecase = new CancelMercadopagoPaymentUsecase(
                    prismaMercadoPagoProviderRepository,
                    outboxEmitter
                )
                return cancelMercadopagoPaymentUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}