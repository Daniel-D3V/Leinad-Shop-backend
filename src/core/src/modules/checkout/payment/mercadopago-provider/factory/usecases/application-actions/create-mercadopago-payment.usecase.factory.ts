import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CancelMercadopagoPaymentUsecase, CreateMercadopagoPaymentUsecase, GenerateMercadopagoPaymentUsecase } from "../../../application/usecases";
import { OrderFacadeFactory } from "@/modules/checkout/order/factories";
import { OrderPaymentFacadeFactory } from "../../../../order-payment/factories";
import { PrismaMercadopagoPaymentProviderRepository } from "../../../infra/repositories";
import { MercadopagoGatewayImp } from "../../../infra/gateways";
import {  CreateMercadopagoPaymentUsecaseInterface } from "../../../domain/usecases/application-actions";


export class CreateMercadopagoPaymentUsecaseFactory {

    static create(): CreateMercadopagoPaymentUsecaseInterface {

        const execute = async (input: CreateMercadopagoPaymentUsecaseInterface.InputDto): Promise<CreateMercadopagoPaymentUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
               
                const mercadopagoGatewayImp = new MercadopagoGatewayImp()
                const prismaMercadoPagoProviderRepository = new PrismaMercadopagoPaymentProviderRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)

                const createMercadopagoPaymentUsecase = new CreateMercadopagoPaymentUsecase(
                    prismaMercadoPagoProviderRepository,
                    mercadopagoGatewayImp,
                    outboxEmitter
                )
                return createMercadopagoPaymentUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}