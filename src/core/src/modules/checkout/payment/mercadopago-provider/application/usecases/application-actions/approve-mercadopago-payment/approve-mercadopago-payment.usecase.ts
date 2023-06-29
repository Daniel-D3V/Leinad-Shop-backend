import { EventEmitterInterface } from "@/modules/@shared/events";
import { MercadopagoGatewayInterface } from "../../../../domain/gateways";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories";
import { ApproveMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/application-actions";
import { left, right } from "@/modules/@shared/logic";
import { MercadopagoPaymentNotFoundError, MercadopagoPaymentProviderNotFoundError, MercadopagoPaymentStatusNotPendingError } from "../../_errors";
import { MercadopagoPaymentProviderIsAlreadyApprovedError } from "./errors";
import { MercadopagoPaymentApprovedEvent } from "./mercadopago-payment-approved.event";

export class ApproveMercadopagoPaymentUsecase implements ApproveMercadopagoPaymentUsecaseInterface {

    constructor(
        private readonly mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface,
        private readonly mercadopagoGateway: MercadopagoGatewayInterface, 
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ mercadopagoPaymentId }: ApproveMercadopagoPaymentUsecaseInterface.InputDto): Promise<ApproveMercadopagoPaymentUsecaseInterface.OutputDto> {
        
        const mercadopagoPayment = await this.mercadopagoGateway.findById(mercadopagoPaymentId)
        if (!mercadopagoPayment) return left([ new MercadopagoPaymentNotFoundError() ])

        if(mercadopagoPayment.status !== "PENDING") return left([ new MercadopagoPaymentStatusNotPendingError() ])

        const mercadopagoPaymentProviderEntity = await this.mercadopagoPaymentProviderRepository.findByMercadopagoPaymentId(mercadopagoPaymentId)
        if(!mercadopagoPaymentProviderEntity) return left([ new MercadopagoPaymentProviderNotFoundError() ])
    
        if(mercadopagoPaymentProviderEntity.isApproved()) return left([ new MercadopagoPaymentProviderIsAlreadyApprovedError() ])
        
        mercadopagoPaymentProviderEntity.approve()

        await this.mercadopagoPaymentProviderRepository.update(mercadopagoPaymentProviderEntity)

        const mercadopagoPaymentApprovedEvent = new MercadopagoPaymentApprovedEvent({
            mercadopagoPaymentProviderId: mercadopagoPaymentProviderEntity.id
        })
        await this.eventEmitter.emit(mercadopagoPaymentApprovedEvent)

        return right(null)
    }
}