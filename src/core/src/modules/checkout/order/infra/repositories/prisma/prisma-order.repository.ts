import { PrismaClient } from "@prisma/client";
import { OrderEntity, OrderItemEntity } from "../../../domain/entities";
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
                const { announceId, ...orderItemsProps } = orderItem
                return {
                    ...orderItemsProps,
                    announceId: orderItem.announceId,
                    orderId: orderEntity.id
                }
            })
        })
    }
    
    async findById(id: string): Promise<OrderEntity | null> {
        const prismaOrder = await this.prismaClient.order.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaOrder) return null
        const prismaOrderItems = await this.prismaClient.orderItems.findMany({
            where: { orderId: prismaOrder.id }
        })
        const orderItems = prismaOrderItems.map(prismaOrderItem => {
            const orderItem = OrderItemEntity.create({
                ...prismaOrderItem,
                announceType: prismaOrderItem.announceType as OrderItemEntity.AnnounceType,
                stockType: prismaOrderItem.stockType as OrderItemEntity.StockType,
            }, prismaOrderItem.id)
            if(orderItem.isLeft()) throw orderItem.value[0]
            return orderItem.value
        })

        const orderEntity = OrderEntity.create({
            customerId: prismaOrder.userId,
            orderItems
        }, prismaOrder.id)
        if(orderEntity.isLeft()) throw orderEntity.value[0] 

        return orderEntity.value
    }
}