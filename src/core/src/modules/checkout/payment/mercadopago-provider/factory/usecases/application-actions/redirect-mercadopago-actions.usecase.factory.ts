import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { RedirectMercadopagoActionsUsecase } from "../../../application/usecases";
import {   RedirectMercadopagoActionsUsecaseInterface } from "../../../domain/usecases/application-actions";
import { CreateMercadopagoPaymentUsecaseFactory} from "./create-mercadopago-payment.usecase.factory";
import { ApproveMercadopagoPaymentUsecaseFactory } from "./approve-mercadopago-payment.usecase.factory";


export class RedirectMercadopagoActionsUsecaseFactory {

    static create(): RedirectMercadopagoActionsUsecaseInterface {

        const createMercadopagoPaymentUsecase = CreateMercadopagoPaymentUsecaseFactory.create()
        const approveMercadopagoPaymentUsecase = ApproveMercadopagoPaymentUsecaseFactory.create()
        
        const redirectMercadopagoActionsUsecase = new RedirectMercadopagoActionsUsecase(
            createMercadopagoPaymentUsecase,
            approveMercadopagoPaymentUsecase
        )
        return redirectMercadopagoActionsUsecase
    }
}