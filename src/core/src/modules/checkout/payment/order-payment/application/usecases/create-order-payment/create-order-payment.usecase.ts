import { left, right } from "@/modules/@shared/logic";
import { OrderPaymentCustomerRepositoryInterface, OrderPaymentRepositoryInterface } from "../../../domain/repositories";
import { CreateOrderPaymentUsecaseInterface } from "../../../domain/usecases/create-order-payment.usecase.interface";
import { OrderPaymentEntity } from "../../../domain/entities";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { OrderPaymentCustomerNotFoundError } from "../_errors";
import { OrderPaymentCreatedEvent } from "./order-payment-created.event";

export class CreateOrderPaymentUsecase implements CreateOrderPaymentUsecaseInterface {
    
    constructor(
        private readonly orderPaymentRepository: OrderPaymentRepositoryInterface,
        private readonly orderPaymentCustomer: OrderPaymentCustomerRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}
    
    async execute({ orderId, userId }: CreateOrderPaymentUsecaseInterface.InputDto): Promise<CreateOrderPaymentUsecaseInterface.OutputDto> {
        
        const orderPaymentCustomerEntity = await this.orderPaymentCustomer.findById(userId)
        if(!orderPaymentCustomerEntity) return left([ new OrderPaymentCustomerNotFoundError() ])

        const orderPaymentEntity = OrderPaymentEntity.create({
            orderId,
            orderPaymentCustomer: orderPaymentCustomerEntity
        })
        if(orderPaymentEntity.isLeft()) return left(orderPaymentEntity.value)

        await this.orderPaymentRepository.create(orderPaymentEntity.value)

        const orderPaymentCreatedEvent = new OrderPaymentCreatedEvent({
            ...orderPaymentEntity.value.toJSON()
        })
        await this.eventEmitter.emit(orderPaymentCreatedEvent)

        return right({
            id: orderPaymentEntity.value.id
        })
    }


}