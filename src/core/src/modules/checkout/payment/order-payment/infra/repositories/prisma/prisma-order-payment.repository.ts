import { OrderPayment, PrismaClient } from "@prisma/client";
import { OrderPaymentEntity } from "../../../domain/entities";
import { OrderPaymentRepositoryInterface, OrderPaymentCustomerRepositoryInterface } from "../../../domain/repositories";


class PrismaOrderPaymentMapper {

    constructor(
        private readonly orderPaymentCustomerRepository: OrderPaymentCustomerRepositoryInterface
    ){}

    async toDomain(prismaOrderPayment: OrderPayment): Promise<OrderPaymentEntity | null> {
        const customerEntity = await this.orderPaymentCustomerRepository.findById(prismaOrderPayment.userId)
        if(!customerEntity) return null
        const orderPaymentEntity = OrderPaymentEntity.create({
            ...prismaOrderPayment,
            paymentProvider: prismaOrderPayment.paymentProvider as OrderPaymentEntity.PaymentProvider ?? undefined,
            paymentProviderId: prismaOrderPayment.paymentProviderId ?? undefined,
            orderPaymentCustomer: customerEntity
        }, prismaOrderPayment.id)
        if(orderPaymentEntity.isLeft()) throw orderPaymentEntity.value[0]
        return orderPaymentEntity.value 
    }
}

export class PrismaOrderPaymentRepository implements OrderPaymentRepositoryInterface {
    
    prismaOrderPaymentMapper: PrismaOrderPaymentMapper

    constructor(
        private readonly prismaClient: PrismaClient,
        private readonly orderPaymentCustomerRepository: OrderPaymentCustomerRepositoryInterface
    ){
        this.prismaOrderPaymentMapper = new PrismaOrderPaymentMapper(
            this.orderPaymentCustomerRepository
        )
    }
    
    async create(orderPaymentEntity: OrderPaymentEntity): Promise<void> {
        const { orderPaymentCustomer, ...props } = orderPaymentEntity.toJSON()
        await this.prismaClient.orderPayment.create({
            data: {
                ...props,
                userId: orderPaymentCustomer.id
            }
        })
    }
    
    async findByOrderId(orderId: string): Promise<OrderPaymentEntity | null> {
        const prismaPayment = await this.prismaClient.orderPayment.findFirst({
            where: { orderId: orderId ?? "" }
        })
        if(!prismaPayment) return null
        return await this.prismaOrderPaymentMapper.toDomain(prismaPayment)
    }

    async findById(id: string): Promise<OrderPaymentEntity | null> {
        const prismaPayment = await this.prismaClient.orderPayment.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaPayment) return null
        return await this.prismaOrderPaymentMapper.toDomain(prismaPayment)
    }
    async update(orderPaymentEntity: OrderPaymentEntity): Promise<void> {
        const { orderPaymentCustomer,id, dateTimeCreated, orderId ,...props } = orderPaymentEntity.toJSON()
        await this.prismaClient.orderPayment.updateMany({
            where: { id: orderPaymentEntity.id ?? ""},
            data: {
                ...props
            }
        })
    }


}