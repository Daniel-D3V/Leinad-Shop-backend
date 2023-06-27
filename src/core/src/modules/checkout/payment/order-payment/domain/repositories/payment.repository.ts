import { OrderPaymentEntity } from "../entities";

export interface OrderPaymentRepositoryInterface {
    create(orderPaymentEntity: OrderPaymentEntity): Promise<void>
    findById(id: string): Promise<OrderPaymentEntity | null>
    findByOrderId(orderId: string): Promise<OrderPaymentEntity | null>
    update(orderPaymentEntity: OrderPaymentEntity): Promise<void>
}