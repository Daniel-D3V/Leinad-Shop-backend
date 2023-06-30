import { left, right } from "@/modules/@shared/logic";
import { ApproveMercadopagoPaymentUsecaseInterface, CancelMercadopagoPaymentUsecaseInterface, CreateMercadopagoPaymentUsecaseInterface, RedirectMercadopagoActionsUsecaseInterface } from "../../../../domain/usecases/application-actions";
import { UsecaseInterface } from "@/modules/@shared/domain";
import { MercadopagoGatewayInterface } from "../../../../domain/gateways";


export class RedirectMercadopagoActionsUsecase implements RedirectMercadopagoActionsUsecaseInterface {

    constructor(
        private readonly mercadopagoGateway: MercadopagoGatewayInterface,
        private readonly createMercadopagoPaymentUsecase: CreateMercadopagoPaymentUsecaseInterface,
        private readonly approveMercadopagoPaymentUsecase: ApproveMercadopagoPaymentUsecaseInterface,
        private readonly cancelMercadopagoPaymentUsecase: CancelMercadopagoPaymentUsecaseInterface
    ){}

   async execute({ action,  mercadoPagoPaymentId }: RedirectMercadopagoActionsUsecaseInterface.InputDto): Promise<RedirectMercadopagoActionsUsecaseInterface.OutputDto> {

        let output: UsecaseInterface.OutputDto | undefined

        if(action === "payment.created") {
            const usecase = this.createMercadopagoPaymentUsecase
            output = await usecase.execute({ mercadopagoPaymentId: mercadoPagoPaymentId })
        }
        if(action === "payment.updated") {
            const mercadopagoPayment = await this.mercadopagoGateway.findById(mercadoPagoPaymentId)
            if(!mercadopagoPayment) return left([ new Error("payment not found") ])
            console.log("mercado pago", mercadopagoPayment)
            if(mercadopagoPayment.status === "APPROVED"){
                const usecase = this.approveMercadopagoPaymentUsecase
                output = await usecase.execute({ mercadopagoPaymentId: mercadoPagoPaymentId })
            } 
            if(mercadopagoPayment.status === "CANCELLED"){
                const usecase = this.cancelMercadopagoPaymentUsecase
                output = await usecase.execute({ mercadopagoPaymentId: mercadoPagoPaymentId })
            }
            if(mercadopagoPayment.status === "REFUNDED"){
                const usecase = this.cancelMercadopagoPaymentUsecase
                output = await usecase.execute({ mercadopagoPaymentId: mercadoPagoPaymentId })
            }
        }

        if(!output) return left([ new Error("no valid actios provided") ])
        if(output.isLeft()) return left(output.value)

        return right(output.value)
    }
}