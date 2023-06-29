import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { RedirectMercadopagoActionsUsecase } from "../../../application/usecases";
import {   RedirectMercadopagoActionsUsecaseInterface } from "../../../domain/usecases/application-actions";
import { CreateMercadopagoPaymentUsecaseFactory } from "./create-mercadopago-payment.usecase.factory";


export class RedirectMercadopagoActionsUsecaseFactory {

    static create(): RedirectMercadopagoActionsUsecaseInterface {

        const execute = async (input: RedirectMercadopagoActionsUsecaseInterface.InputDto): Promise<RedirectMercadopagoActionsUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                
                const createMercadopagoPaymentUsecase = CreateMercadopagoPaymentUsecaseFactory.create() 
                const redirectMercadopagoActionsUsecase = new RedirectMercadopagoActionsUsecase(
                    createMercadopagoPaymentUsecase
                )
                return redirectMercadopagoActionsUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}