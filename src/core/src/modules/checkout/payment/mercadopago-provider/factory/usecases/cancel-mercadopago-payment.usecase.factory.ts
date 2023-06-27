import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CancelMercadopagoPaymentUsecase, GenerateMercadopagoPaymentUsecase } from "../../application/usecases";
import { CancelMercadopagoPaymentUsecaseInterface } from "../../domain/usecases";
import { OrderFacadeFactory } from "@/modules/checkout/order/factories";
import { OrderPaymentFacadeFactory } from "../../../order-payment/factories";
import { PrismaMercadopagoPaymentProviderRepository } from "../../infra/repositories";
import { MercadopagoGatewayImp } from "../../infra/gateways";


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