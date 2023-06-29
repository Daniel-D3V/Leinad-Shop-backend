import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { GenerateMercadopagoPaymentUsecase } from "../../../application/usecases";
import { OrderFacadeFactory } from "@/modules/checkout/order/factories";
import { OrderPaymentFacadeFactory } from "../../../../order-payment/factories";
import { PrismaMercadopagoPaymentProviderRepository } from "../../../infra/repositories";
import { MercadopagoGatewayImp } from "../../../infra/gateways";
import { GenerateMercadopagoPaymentUsecaseInterface } from "../../../domain/usecases/mercadopago-actions";


export class GenerateMercadopagoPaymentUsecaseFactory {

    static create(): GenerateMercadopagoPaymentUsecaseInterface {

        const execute = async (input: GenerateMercadopagoPaymentUsecaseInterface.InputDto): Promise<GenerateMercadopagoPaymentUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                
                const orderFacade = OrderFacadeFactory.create(prisma as PrismaClient)
                const orderPaymentFacade = OrderPaymentFacadeFactory.create(prisma as PrismaClient)
                const mercadopagoGateway = new MercadopagoGatewayImp()

                const generateMercadopagoPaymentUsecase = new GenerateMercadopagoPaymentUsecase(
                    orderFacade,
                    orderPaymentFacade,
                    mercadopagoGateway,
                )
                return generateMercadopagoPaymentUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}