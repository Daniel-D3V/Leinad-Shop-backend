import { EventEmitterInterface } from "@/modules/@shared/events";
import { MercadopagoGatewayInterface } from "../../../../domain/gateways";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories";
import { ApproveMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/application-actions";
import { left, right } from "@/modules/@shared/logic";
import { MercadopagoPaymentNotFoundError,MercadopagoPaymentProviderNotFoundError ,MercadopagoPaymentStatusNotApprovedError } from "../../_errors";
import { MercadopagoPaymentProviderIsAlreadyApprovedError, OrderPaymentNotFoundError, PaymentIsNotInUseError, RefundError } from "./errors";
import { MercadopagoPaymentApprovedEvent } from "./mercadopago-payment-approved.event";
import { OrderPaymentFacadeInterface } from "@/modules/checkout/payment/order-payment/facades";

export class ApproveMercadopagoPaymentUsecase implements ApproveMercadopagoPaymentUsecaseInterface {

    constructor(
        private readonly mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface,
        private readonly mercadopagoGateway: MercadopagoGatewayInterface, 
        private readonly orderPaymentFacade: OrderPaymentFacadeInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ mercadopagoPaymentId }: ApproveMercadopagoPaymentUsecaseInterface.InputDto): Promise<ApproveMercadopagoPaymentUsecaseInterface.OutputDto> {
        
        const mercadopagoPayment = await this.mercadopagoGateway.findById(mercadopagoPaymentId)
        if (!mercadopagoPayment) return left([ new MercadopagoPaymentNotFoundError() ])

        if(mercadopagoPayment.status !== "APPROVED") return left([ new MercadopagoPaymentStatusNotApprovedError() ])

        const mercadopagoPaymentProviderEntity = await this.mercadopagoPaymentProviderRepository.findByMercadopagoPaymentId(mercadopagoPaymentId)
        if(!mercadopagoPaymentProviderEntity) return left([ new MercadopagoPaymentProviderNotFoundError() ])
    
        if(mercadopagoPaymentProviderEntity.isApproved()) return left([ new MercadopagoPaymentProviderIsAlreadyApprovedError() ])
        
        const orderPayment = await this.orderPaymentFacade.getOrderPaymentDetailsById(mercadopagoPaymentProviderEntity.orderPaymentId)
        if(!orderPayment) return left([ new OrderPaymentNotFoundError() ])

        if(mercadopagoPaymentProviderEntity.id !== orderPayment.orderPaymentProviderId ) {
            const refundResult = await this.mercadopagoGateway.refund(mercadopagoPayment.paymentId)
            if(!refundResult) return left([ new RefundError() ])
            return left([ new PaymentIsNotInUseError() ])
        }

        mercadopagoPaymentProviderEntity.approve()

        await this.mercadopagoPaymentProviderRepository.update(mercadopagoPaymentProviderEntity)

        const mercadopagoPaymentApprovedEvent = new MercadopagoPaymentApprovedEvent({
            mercadopagoPaymentProviderId: mercadopagoPaymentProviderEntity.id
        })
        await this.eventEmitter.emit(mercadopagoPaymentApprovedEvent)

        return right(null)
    }
}