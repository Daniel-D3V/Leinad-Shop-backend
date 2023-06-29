import { left, right } from "@/modules/@shared/logic";
import { CreateMercadopagoPaymentUsecaseInterface, RedirectMercadopagoActionsUsecaseInterface } from "../../../../domain/usecases/application-actions";
import { UsecaseInterface } from "@/modules/@shared/domain";


export class RedirectMercadopagoActionsUsecase implements RedirectMercadopagoActionsUsecaseInterface {

    constructor(
        private readonly createMercadopagoPaymentUsecase: CreateMercadopagoPaymentUsecaseInterface
    ){}

   async execute({ action,  mercadoPagoPaymentId }: RedirectMercadopagoActionsUsecaseInterface.InputDto): Promise<RedirectMercadopagoActionsUsecaseInterface.OutputDto> {

        let output: UsecaseInterface.OutputDto | undefined

        if(action === "payment.created") {
            const usecase = this.createMercadopagoPaymentUsecase
            output = await usecase.execute({ mercadopagoPaymentId: mercadoPagoPaymentId })
        }

        if(action === "payment.updated") {
            const usecase = this.createMercadopagoPaymentUsecase
            output = await usecase.execute({ mercadopagoPaymentId: mercadoPagoPaymentId })
        }

        if(!output) return left([ new Error("no valid actios provided") ])
        if(output.isLeft()) return left(output.value)

        return right(output.value)
    }
}