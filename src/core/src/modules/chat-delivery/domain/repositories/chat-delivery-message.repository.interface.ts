import { ChatDeliveryMessageEntity } from "../entities";

export interface ChatDeliveryMessageRepositoryInterface {
    findById(id: string): Promise<ChatDeliveryMessageEntity | null>
    create(chatDeliveryMessageEntity: ChatDeliveryMessageEntity): Promise<void>
    delete(id: string): Promise<void>
    update(chatDeliveryMessageEntity: ChatDeliveryMessageEntity): Promise<void>
}