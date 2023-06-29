import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ApproveMercadopagoPaymentUsecase, CancelMercadopagoPaymentUsecase } from "../../../application/usecases";
import { PrismaMercadopagoPaymentProviderRepository } from "../../../infra/repositories";
import { ApproveMercadopagoPaymentUsecaseInterface } from "../../../domain/usecases/application-actions";
import { MercadopagoGatewayImp } from "../../../infra/gateways";


export class ApproveMercadopagoPaymentUsecaseFactory {

    static create(): ApproveMercadopagoPaymentUsecaseInterface {

        const execute = async (input: ApproveMercadopagoPaymentUsecaseInterface.InputDto): Promise<ApproveMercadopagoPaymentUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
               
                const prismaMercadoPagoProviderRepository = new PrismaMercadopagoPaymentProviderRepository(prisma as PrismaClient)
                const mercadopagoGatewayImp = new MercadopagoGatewayImp()
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)

                const approveMercadopagoPaymentUsecase = new ApproveMercadopagoPaymentUsecase(
                    prismaMercadoPagoProviderRepository,
                    mercadopagoGatewayImp,
                    outboxEmitter
                )
                return approveMercadopagoPaymentUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}