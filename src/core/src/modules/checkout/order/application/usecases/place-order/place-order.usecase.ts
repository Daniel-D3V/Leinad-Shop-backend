
import { Either, left, right } from "@/modules/@shared/logic";
import { CreateOrderItemsFromPropsUsecase } from "./create-order-items-from-props/create-order-items-from-props.usecase";
import { OrderEntity } from "../../../domain/entities";
import { OrderPlacedEvent } from "./order-placed.event";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { OrderRepositoryInterface } from "../../../domain/repositories";
import { PlaceOrderUsecaseInterface } from "../../../domain/usecases";

export class PlaceOrderUsecase implements PlaceOrderUsecaseInterface {

    constructor(
        private readonly orderRepository: OrderRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ customerId, products }: PlaceOrderUsecaseInterface.InputDto): Promise<PlaceOrderUsecaseInterface.OutputDto> {

        // const createOrderItemsFromPropsUsecase = new CreateOrderItemsFromPropsUsecase()
        // const orderItems = await createOrderItemsFromPropsUsecase.execute(products)
        // if(orderItems.isLeft()) return left(orderItems.value)

        // const orderEntity = OrderEntity.create({
        //     customerId,
        //     orderItems: orderItems.value
        // })
        // if(orderEntity.isLeft()) return left(orderEntity.value)

        // await this.orderRepository.create(orderEntity.value)

        // const orderPlacedEvent = new OrderPlacedEvent({
        //     ...orderEntity.value.toJSON(),
        //     total: orderEntity.value.getTotal(),
        //     totalItemsQuantity: orderEntity.value.getTotalQuantity()
        // })

         const orderPlacedEvent = new OrderPlacedEvent({
            id: "any_order_id",
            customerId,
            orderItems: [ 
                { id: "any_order_item_id", productId: "any_product_id", quantity: 1, unitPrice: 1 },
                { id: "any_order_item_id_2", productId: "any_product_id", quantity: 2, unitPrice: 1 },
                { id: "any_order_item_id_3", productId: "any_product_id", quantity: 3, unitPrice: 2 }
            ],
            total: 7,
            totalItemsQuantity: 6,
            status: "PENDING"
        })
        console.log(orderPlacedEvent.format())
        await this.eventEmitter.emit(orderPlacedEvent)

        return right({
            id: "orderEntity.value.id"
        })
    }
}