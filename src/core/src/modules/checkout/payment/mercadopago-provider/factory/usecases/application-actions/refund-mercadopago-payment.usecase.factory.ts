import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { RefundMercadopagoPaymentUsecase } from "../../../application/usecases";
import { PrismaMercadopagoPaymentProviderRepository } from "../../../infra/repositories";
import {  RefundMercadopagoPaymentUsecaseInterface } from "../../../domain/usecases/application-actions";
import { MercadopagoGatewayImp } from "../../../infra/gateways";


export class RefundMercadopagoPaymentUsecaseFactory {

    static create(): RefundMercadopagoPaymentUsecaseInterface  {

        const execute = async (input: RefundMercadopagoPaymentUsecaseInterface.InputDto): Promise<RefundMercadopagoPaymentUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
               
                const mercadopagoGatewayImp = new MercadopagoGatewayImp()
                const prismaMercadoPagoProviderRepository = new PrismaMercadopagoPaymentProviderRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)


                const refundMercadopagoPaymentUsecase = new RefundMercadopagoPaymentUsecase(
                    prismaMercadoPagoProviderRepository,
                    mercadopagoGatewayImp,
                    outboxEmitter
                )
                return refundMercadopagoPaymentUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}