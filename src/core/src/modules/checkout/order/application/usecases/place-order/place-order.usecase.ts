
import { Either, left, right } from "@/modules/@shared/logic";
import { OrderEntity } from "../../../domain/entities";
import { OrderPlacedEvent } from "./order-placed.event";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { OrderRepositoryInterface } from "../../../domain/repositories";
import { PlaceOrderUsecaseInterface } from "../../../domain/usecases";
import { CreateOrderItemFromPropsUsecaseFactory } from "../../../factories";

export class PlaceOrderUsecase implements PlaceOrderUsecaseInterface {

    constructor(
        private readonly orderRepository: OrderRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ customerId, products }: PlaceOrderUsecaseInterface.InputDto): Promise<PlaceOrderUsecaseInterface.OutputDto> {
        
        const createOrderItemsFromPropsUsecase = CreateOrderItemFromPropsUsecaseFactory.create()
        const orderItems = await createOrderItemsFromPropsUsecase.execute(products)
        if(orderItems.isLeft()) return left(orderItems.value)

        const orderEntity = OrderEntity.create({
            customerId,
            orderItems: orderItems.value
        })
        if(orderEntity.isLeft()) return left(orderEntity.value)

        await this.orderRepository.create(orderEntity.value)

        const orderPlacedEvent = new OrderPlacedEvent({
            ...orderEntity.value.toJSON(),
            total: orderEntity.value.getTotal(),
            totalItemsQuantity: orderEntity.value.getTotalQuantity()
        })

        await this.eventEmitter.emit(orderPlacedEvent)

        return right({
            id: orderEntity.value.id
        })
    }
}