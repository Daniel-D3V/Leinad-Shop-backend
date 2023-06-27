import { PrismaClient } from "@prisma/client";
import { OrderPaymentEntity } from "../../../domain/entities";
import { OrderPaymentRepositoryInterface, OrderPaymentCustomerRepositoryInterface } from "../../../domain/repositories";

export class PrismaOrderPaymentRepository implements OrderPaymentRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient,
        private readonly orderPaymentCustomerRepository: OrderPaymentCustomerRepositoryInterface
    ){}
    findByOrderId(orderId: string): Promise<OrderPaymentEntity | null> {
        throw new Error("Method not implemented.");
    }
    
    async create(orderPaymentEntity: OrderPaymentEntity): Promise<void> {
        const { customer, ...props } = orderPaymentEntity.toJSON()
        await this.prismaClient.payment.create({
            data: {
                ...props,
                userId: customer.id
            }
        })
    }
    async findById(id: string): Promise<PaymentEntity | null> {
        const prismaPayment = await this.prismaClient.payment.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaPayment) return null

        const customerEntity = await this.customerRepository.findById(prismaPayment.userId)
        if(!customerEntity) return null

        const paymentEntity = PaymentEntity.create({
            ...prismaPayment,
            paymentMethod: prismaPayment.paymentMethod as PaymentEntity.PaymentMethod,
            customer: customerEntity
        }, prismaPayment.id)
        if(paymentEntity.isLeft()) throw paymentEntity.value[0]
        return paymentEntity.value 
    }
    async update(paymentEntity: PaymentEntity): Promise<void> {
        await this.prismaClient.payment.updateMany({
            where: { id: paymentEntity.id ?? ""},
            data: {
                status: paymentEntity.status,
            }
        })
    }


}