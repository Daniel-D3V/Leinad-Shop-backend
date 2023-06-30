import { EventEmitterInterface } from "@/modules/@shared/events";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories";
import { CancelMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/application-actions";
import { left, right } from "@/modules/@shared/logic";
import { MercadopagoPaymentNotFoundError, MercadopagoPaymentProviderNotFoundError, MercadopagoPaymentStatusNotCancelledError } from "../../_errors";
import { MercadopagoPaymentCancelledEvent } from "./mercadopago-payment-cancelled.event";
import { MercadopagoGatewayInterface } from "../../../../domain/gateways";
import { MercadopagoPaymentProviderIsAlreadyCancelledError } from "./errors";

export class CancelMercadopagoPaymentUsecase implements CancelMercadopagoPaymentUsecaseInterface {

    constructor(
        private readonly mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface,
        private readonly mercadopagoGateway: MercadopagoGatewayInterface, 
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ mercadopagoPaymentId }: CancelMercadopagoPaymentUsecaseInterface.InputDto): Promise<CancelMercadopagoPaymentUsecaseInterface.OutputDto> {
        
        const mercadopagoPayment = await this.mercadopagoGateway.findById(mercadopagoPaymentId)
        if (!mercadopagoPayment) return left([ new MercadopagoPaymentNotFoundError() ])

        if(mercadopagoPayment.status !== "CANCELLED") return left([ new MercadopagoPaymentStatusNotCancelledError() ])

        const mercadopagoPaymentProviderEntity = await this.mercadopagoPaymentProviderRepository.findByMercadopagoPaymentId(mercadopagoPaymentId)
        if(!mercadopagoPaymentProviderEntity) return left([ new MercadopagoPaymentProviderNotFoundError() ])

        if(mercadopagoPaymentProviderEntity.isCancelled()) return left([ new MercadopagoPaymentProviderIsAlreadyCancelledError() ])

        mercadopagoPaymentProviderEntity.cancel()
        await this.mercadopagoPaymentProviderRepository.update(mercadopagoPaymentProviderEntity)

        const mercadopagoPaymentCancelledEvent = new MercadopagoPaymentCancelledEvent({
            mercadopagoPaymentProviderId: mercadopagoPaymentProviderEntity.id
        })
        await this.eventEmitter.emit(mercadopagoPaymentCancelledEvent)

        return right(null)
    }
}