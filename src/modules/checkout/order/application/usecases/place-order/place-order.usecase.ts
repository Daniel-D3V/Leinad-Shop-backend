import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";
import { CreateOrderItemsFromDtoUsecase } from "./helpers";
import { OrderEntity } from "../../../domain/entities";
import { OrderPlacedEvent } from "./order-placed.event";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { OrderRepositoryInterface } from "../../../domain/repositories";

export class PlaceOrderUsecase implements UsecaseInterface {

    constructor(
        private readonly orderRepository: OrderRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ customerId, products }: PlaceOrderInputDto): Promise<Either<Error[], PlaceOrderOutputDto>> {

        const createOrderItemsFromDtoUsecase = new CreateOrderItemsFromDtoUsecase()
        const orderItems = await createOrderItemsFromDtoUsecase.execute(products)
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

        return right(null)
    }

 
}