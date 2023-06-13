import { ChatDeliveryEntity } from "@/modules/chat-delivery/domain/entities";
import { PrismaChatDeliveryRepository } from "./prisma-chat-delivery.repository";
import { mock } from "jest-mock-extended";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";

describe("Test prismaChatDeliveryRepository integration with mysql", () => {
    let sut: PrismaChatDeliveryRepository
    let chatDeliveryEntity: ChatDeliveryEntity
    let props: ChatDeliveryEntity.PropsJSON
    let id: string

    beforeEach(async () => {
        id = "any_id"
        props = {
            id,
            customerId: "any_customer_id",
            orderId: "any_order_id",
            salesmanId: "any_salesman_id",
            status: "PENDINGDELIVERY"
        }

        chatDeliveryEntity = mock<ChatDeliveryEntity>({
            toJSON: () => props,
            id
        })

        sut = new PrismaChatDeliveryRepository(prismaClient)
        await prismaClient.chatDelivery.deleteMany()
    })

    it("Should persist the chatDelivery on the database", async () => {
        await sut.create(chatDeliveryEntity)
        const category = await prismaClient.chatDelivery.findUnique({
            where: {
                id
            }
        })
        expect({
            ...category,
            parentId: undefined
        }).toEqual(props)
    })

    it("Should find by findById", async () => {
        await sut.create(chatDeliveryEntity)
        const chatDeliveryEntityFound = await sut.findById(id)
        expect(chatDeliveryEntityFound).toBeInstanceOf(ChatDeliveryEntity)
    })

    it("Should find by findByOrderId", async () => {
        await sut.create(chatDeliveryEntity)
        const chatDeliveryEntityFound = await sut.findByOrderId(props.orderId)
        expect(chatDeliveryEntityFound).toBeInstanceOf(ChatDeliveryEntity)
    })

    it("Should update the chatDeliveryEntity", async () => {
        await sut.create(chatDeliveryEntity)

        let currenctChatDelivery = await sut.findById(chatDeliveryEntity.id)
        expect(chatDeliveryEntity.toJSON()).toEqual(currenctChatDelivery?.toJSON());

        chatDeliveryEntity.deliver();

        await sut.update(chatDeliveryEntity)

        let updatedChatDelivery = await sut.findById(chatDeliveryEntity.id)

        expect(updatedChatDelivery?.toJSON()).toEqual(updatedChatDelivery?.toJSON());
    })
});