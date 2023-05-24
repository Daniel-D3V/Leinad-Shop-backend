import { PrismaClient } from "@prisma/client";
import { OrderEntity } from "../../../domain/entities";
import { OrderRepositoryInterface } from "../../../domain/repositories";

export class PrismaOrderRepository implements OrderRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(orderEntity: OrderEntity): Promise<void> {
        const { customerId, orderItems, ...props } = orderEntity.toJSON()
        await this.prismaClient.order.create({
            data: {
                ...props,
                userId: customerId,
            }
        })
        await this.prismaClient.orderItems.createMany({
            data: orderItems.map(orderItem => {
                const { productId, ...orderItemsProps } = orderItem
                return {
                    ...orderItemsProps,
                    announceId: orderItem.productId,
                    orderId: orderEntity.id
                }
            })
        })
    }

}