import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { RedirectMercadopagoActionsUsecase } from "../../../application/usecases";
import {   RedirectMercadopagoActionsUsecaseInterface } from "../../../domain/usecases/application-actions";
import { CreateMercadopagoPaymentUsecaseFactory} from "./create-mercadopago-payment.usecase.factory";
import { ApproveMercadopagoPaymentUsecaseFactory } from "./approve-mercadopago-payment.usecase.factory";
import { MercadopagoGatewayImp } from "../../../infra/gateways";
import { CancelMercadopagoPaymentUsecaseFactory } from "./cancel-mercadopago-payment.usecase.factory";
import { RefundMercadopagoPaymentUsecaseFactory } from "./refund-mercadopago-payment.usecase.factory";


export class RedirectMercadopagoActionsUsecaseFactory {

    static create(): RedirectMercadopagoActionsUsecaseInterface {

        const mercadopagoGatewayImp = new MercadopagoGatewayImp()
        const createMercadopagoPaymentUsecase = CreateMercadopagoPaymentUsecaseFactory.create()
        const approveMercadopagoPaymentUsecase = ApproveMercadopagoPaymentUsecaseFactory.create()
        const cancelMercadopagoPaymentUsecase = CancelMercadopagoPaymentUsecaseFactory.create()
        const refundMercadopagoPaymentUsecase = RefundMercadopagoPaymentUsecaseFactory.create()

        const redirectMercadopagoActionsUsecase = new RedirectMercadopagoActionsUsecase(
            mercadopagoGatewayImp,
            createMercadopagoPaymentUsecase,
            approveMercadopagoPaymentUsecase,
            cancelMercadopagoPaymentUsecase,
            refundMercadopagoPaymentUsecase
        )
        return redirectMercadopagoActionsUsecase
    }
}