import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaOrderRepository } from "./prisma-order.repository"
import { OrderEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"

describe("Test PrismaOrderRepository", () => {


    let sut: PrismaOrderRepository
    let orderEntity: OrderEntity

    beforeEach(async () => {
        orderEntity = mock<OrderEntity>({
            toJSON: () => ({
                id: "any_id",
                customerId: "any_customer_id",
                status: "PENDINGPAYMENT",
                orderItems: [
                    { id: "any_id", productId: "any_product_id", quantity: 1, unitPrice: 1 },
                    { id: "any_id_1", productId: "any_product_id", quantity: 1, unitPrice: 1 }
                ]
            }) as any
        })
        sut = new PrismaOrderRepository(prismaClient)
        await prismaClient.order.deleteMany({})
        await prismaClient.orderItems.deleteMany({})
    })

    it("Should create a new order", async () => {
        await sut.create(orderEntity)
        const prismaOrder = await prismaClient.order.findFirst({
            where: {
                id: orderEntity.toJSON().id
            }
        })
        const { orderItems, ...orderEntityProps } = orderEntity.toJSON()
        expect(prismaOrder).toBeTruthy()
        expect(prismaOrder?.id).toBe(orderEntityProps.id)
    })
})