import { ChatDeliveryEntity } from "../entities";

export interface ChatDeliveryRepositoryInterface {
    findById(id: string): Promise<ChatDeliveryEntity | null>
    findByOrderId(orderId: string): Promise<ChatDeliveryEntity | null>
    create(chatDeliveryEntity: ChatDeliveryEntity): Promise<void>
    delete(id: string): Promise<void>
    update(chatDeliveryEntity: ChatDeliveryEntity): Promise<void>
}