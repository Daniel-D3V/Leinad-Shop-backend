import { left, right } from "@/modules/@shared/logic";
import { RefundMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/application-actions";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { MercadopagoGatewayInterface } from "../../../../domain/gateways";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories";
import { MercadopagoPaymentNotFoundError, MercadopagoPaymentProviderNotFoundError, MercadopagoPaymentStatusNotRefundedError } from "../../_errors";
import { MercadopagoPaymentProviderIsAlreadyRefundedError } from "./errors";
import { MercadopagoPaymentRefundedEvent } from "./mercadopago-payment-approved.event";


export class RefundMercadopagoPaymentUsecase implements RefundMercadopagoPaymentUsecaseInterface {

    constructor(
        private readonly mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface,
        private readonly mercadopagoGateway: MercadopagoGatewayInterface, 
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ mercadopagoPaymentId }: RefundMercadopagoPaymentUsecaseInterface.InputDto): Promise<RefundMercadopagoPaymentUsecaseInterface.OutputDto> {
        
        const mercadopagoPayment = await this.mercadopagoGateway.findById(mercadopagoPaymentId)
        if (!mercadopagoPayment) return left([ new MercadopagoPaymentNotFoundError() ])

        if(mercadopagoPayment.status !== "REFUNDED") return left([ new MercadopagoPaymentStatusNotRefundedError() ])

        const mercadopagoPaymentProviderEntity = await this.mercadopagoPaymentProviderRepository.findByMercadopagoPaymentId(mercadopagoPaymentId)
        if(!mercadopagoPaymentProviderEntity) return left([ new MercadopagoPaymentProviderNotFoundError() ])
    
        if(mercadopagoPaymentProviderEntity.isRefunded()) return left([ new MercadopagoPaymentProviderIsAlreadyRefundedError() ])
        mercadopagoPaymentProviderEntity.refund()

        await this.mercadopagoPaymentProviderRepository.update(mercadopagoPaymentProviderEntity)

        const mercadopagoPaymentRefundedEvent = new MercadopagoPaymentRefundedEvent({
            mercadopagoPaymentProviderId: mercadopagoPaymentProviderEntity.id
        })
        await this.eventEmitter.emit(mercadopagoPaymentRefundedEvent)

        return right(null)

        return right(null)
    }
}