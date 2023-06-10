import { ChatDeliveryEntity } from "@/modules/chat-delivery/domain/entities";
import { ChatDeliveryRepositoryInterface } from "@/modules/chat-delivery/domain/repositories";
import { ChatDelivery, PrismaClient, Prisma } from "@prisma/client";

class PrismaChatDeliveryEntityMapper {
    static toDomain(prismaChatDelivery: ChatDelivery): ChatDeliveryEntity | null {
        const chatDeliveryEntity = ChatDeliveryEntity.create({
            ...prismaChatDelivery
        }, prismaChatDelivery.id)

        if (chatDeliveryEntity.isLeft()) throw chatDeliveryEntity.value[0]
        if (prismaChatDelivery.status === "DELIVERED") chatDeliveryEntity.value.deliver();
        if (prismaChatDelivery.status === "FINISHED") chatDeliveryEntity.value.finish();
        return chatDeliveryEntity.value
    }
}

export class PrismaChatDeliveryRepository implements ChatDeliveryRepositoryInterface {

    constructor(private readonly prismaClient: PrismaClient) {

    }

    async findById(id: string): Promise<ChatDeliveryEntity | null> {
        const prismaChatDelivery = await this.prismaClient.chatDelivery.findFirst({
            where: { id: id ?? "" }
        })
        if (!prismaChatDelivery) return null;
        return PrismaChatDeliveryEntityMapper.toDomain(prismaChatDelivery)
    }

    async findByOrderId(orderId: string): Promise<ChatDeliveryEntity | null> {
        const prismaChatDelivery = await this.prismaClient.chatDelivery.findFirst({
            where: { orderId: orderId ?? "" }
        })
        if (!prismaChatDelivery) return null;
        return PrismaChatDeliveryEntityMapper.toDomain(prismaChatDelivery)
    }

    async create(chatDeliveryEntity: ChatDeliveryEntity): Promise<void> {
        await this.prismaClient.chatDelivery.create({
            data: {
                ...chatDeliveryEntity.toJSON(),

            }
        })
    }

    async delete(id: string): Promise<void> {
        await this.prismaClient.chatDelivery.deleteMany({
            where: { id: id ?? "" }
        })
    }

    async update(chatDeliveryEntity: ChatDeliveryEntity): Promise<void> {
        const { id, ...propsToUpdate } = chatDeliveryEntity.toJSON()
        await this.prismaClient.chatDelivery.update({
            where: { id: id ?? "" },
            data: {
                ...propsToUpdate,
            }
        })
    }
}
