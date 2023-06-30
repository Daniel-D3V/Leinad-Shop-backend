import { left, right } from "@/modules/@shared/logic";
import { CreateMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/application-actions";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories";
import { MercadopagoGatewayInterface } from "../../../../domain/gateways";
import { MercadopagoPaymentProviderAlreadyCreatedError } from "./errors";
import { MercadopagoPaymentNotFoundError } from "../../_errors";
import { MercadopagoPaymentProviderEntity } from "../../../../domain/entities";
import { MercadopagoPaymentCreatedEvent } from "./mercadopago-payment-created.event";
import { EventEmitterInterface } from "@/modules/@shared/events";

export class CreateMercadopagoPaymentUsecase implements CreateMercadopagoPaymentUsecaseInterface {

    constructor(
        private readonly mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface,
        private readonly mercadopagoGateway: MercadopagoGatewayInterface, 
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ mercadopagoPaymentId }: CreateMercadopagoPaymentUsecaseInterface.InputDto): Promise<CreateMercadopagoPaymentUsecaseInterface.OutputDto> {
        
        const mercadopagoPayment = await this.mercadopagoGateway.findById(mercadopagoPaymentId)
        if(!mercadopagoPayment) return left([ new MercadopagoPaymentNotFoundError() ])

        const mercadopagoPaymentProviderExists = await this.mercadopagoPaymentProviderRepository.findByMercadopagoPaymentId(mercadopagoPayment.paymentId)
        if(mercadopagoPaymentProviderExists) return left([ new MercadopagoPaymentProviderAlreadyCreatedError() ])
        
        const mercadopagoPaymentProviderEntity = MercadopagoPaymentProviderEntity.create({
            mercadopagoPaymentId: mercadopagoPayment.paymentId,
            amount: mercadopagoPayment.amount,
            orderPaymentId: mercadopagoPayment.orderPaymentId,
            paymentMethod: mercadopagoPayment.paymentMethod,
            expirationDate: mercadopagoPayment.expirationDate
        })

        await this.mercadopagoPaymentProviderRepository.create(mercadopagoPaymentProviderEntity)

        const mercadopagoPaymentCreatedEvent = new MercadopagoPaymentCreatedEvent({
            ...mercadopagoPaymentProviderEntity.toJSON()
        })
        await this.eventEmitter.emit(mercadopagoPaymentCreatedEvent)

        return right({
            id: mercadopagoPaymentProviderEntity.id
        })
    }
}