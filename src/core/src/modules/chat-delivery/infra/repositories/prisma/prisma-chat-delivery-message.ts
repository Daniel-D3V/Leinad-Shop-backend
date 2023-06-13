import { ChatDeliveryEntity, ChatDeliveryMessageEntity } from "@/modules/chat-delivery/domain/entities";
import { ChatDeliveryMessageRepositoryInterface, ChatDeliveryRepositoryInterface } from "@/modules/chat-delivery/domain/repositories";
import { ChatDelivery, PrismaClient, Prisma } from "@prisma/client";

class PrismaChatDeliveryMessageEntityMapper {
    static toDomain(prismaChatDeliveryMessage: ChatDeliveryMessageEntity): ChatDeliveryMessageEntity | null {
        const chatDeliveryMessageEntity = ChatDeliveryMessageEntity.create(prismaChatDeliveryMessage, prismaChatDeliveryMessage.id)
        if (chatDeliveryMessageEntity.isLeft()) throw chatDeliveryMessageEntity.value[0]
        return chatDeliveryMessageEntity.value
    }
}

export class PrismaChatDeliveryMessageRepository implements ChatDeliveryMessageRepositoryInterface {

    constructor(private readonly prismaClient: PrismaClient) {

    }

    findById(id: string): Promise<ChatDeliveryMessageEntity | null> {
        throw new Error("Method not implemented.");
    }

    create(chatDeliveryMessageEntity: ChatDeliveryMessageEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(chatDeliveryMessageEntity: ChatDeliveryMessageEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
