import { left, right } from "@/modules/@shared/logic";
import { SetMercadopagoProviderUsecaseInterface } from "../../../domain/usecases";
import { OrderPaymentRepositoryInterface } from "../../../domain/repositories";
import { OrderPaymentAlreadyHasAProviderError, OrderPaymentNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { OrderPaymentMercadopagoAssignmentFailureEvent, OrderPaymentMercadopagoProviderSetEvent } from "./events";


export class SetMercadopagoProviderUsecase implements SetMercadopagoProviderUsecaseInterface {

    constructor(
        private readonly orderPaymentRepository: OrderPaymentRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ orderPaymentId, mercadopagoProviderId }: SetMercadopagoProviderUsecaseInterface.InputDto): Promise<SetMercadopagoProviderUsecaseInterface.OutputDto> {
        
        const orderPaymentEntity = await this.orderPaymentRepository.findById(orderPaymentId)
        if(!orderPaymentEntity) return left([ new OrderPaymentNotFoundError() ])

        if(orderPaymentEntity.hasPaymentProvider()){
            const orderPaymentMercadopagoAssignmentFailureEvent = new OrderPaymentMercadopagoAssignmentFailureEvent({
                orderPaymentId: orderPaymentEntity.id,
                mercadopagoProviderId: orderPaymentEntity.paymentProviderId ?? ""
            })
            await this.eventEmitter.emit(orderPaymentMercadopagoAssignmentFailureEvent)
            return left([ new OrderPaymentAlreadyHasAProviderError() ])
        }

        orderPaymentEntity.setMercadopagoPaymentProvider(mercadopagoProviderId)
        await this.orderPaymentRepository.update(orderPaymentEntity)

        const orderPaymentMercadopagoProviderSetEvent = new OrderPaymentMercadopagoProviderSetEvent({
            orderPaymentId: orderPaymentEntity.id,
            mercadopagoProviderId: orderPaymentEntity.paymentProviderId ?? ""
        })

        await this.eventEmitter.emit(orderPaymentMercadopagoProviderSetEvent)

        return right(null)
    }
}