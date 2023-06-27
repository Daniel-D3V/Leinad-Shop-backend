import { EventEmitterInterface } from "@/modules/@shared/events";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../domain/repositories";
import { CancelMercadopagoPaymentUsecaseInterface } from "../../../domain/usecases";
import { left, right } from "@/modules/@shared/logic";
import { MercadopagoPaymentProviderNotFoundError } from "../_errors";
import { MercadopagoPaymentCancelledEvent } from "./mercadopago-payment-cancelled.event";

export class CancelMercadopagoPaymentUsecase implements CancelMercadopagoPaymentUsecaseInterface {

    constructor(
        private readonly mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ mercadopagoPaymentProviderId }: CancelMercadopagoPaymentUsecaseInterface.InputDto): Promise<CancelMercadopagoPaymentUsecaseInterface.OutputDto> {
        
        const mercadopagoPaymentProviderEntity = await this.mercadopagoPaymentProviderRepository.findById(mercadopagoPaymentProviderId)
        if(!mercadopagoPaymentProviderEntity) return left([ new MercadopagoPaymentProviderNotFoundError() ])

        mercadopagoPaymentProviderEntity.cancel()
        await this.mercadopagoPaymentProviderRepository.update(mercadopagoPaymentProviderEntity)

        const mercadopagoPaymentCancelledEvent = new MercadopagoPaymentCancelledEvent({
            mercadopagoPaymentProviderId: mercadopagoPaymentProviderEntity.id
        })
        await this.eventEmitter.emit(mercadopagoPaymentCancelledEvent)

        return right(null)
    }
}