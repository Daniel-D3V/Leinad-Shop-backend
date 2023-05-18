import { OrderEntity } from "../entities";

export interface OrderRepositoryInterface {
    create(orderEntity: OrderEntity): Promise<void>
}