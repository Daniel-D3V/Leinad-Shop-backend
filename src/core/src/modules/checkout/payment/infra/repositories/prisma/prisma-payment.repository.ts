import { PrismaClient } from "@prisma/client";
import { PaymentEntity } from "../../../domain/entities";
import { CustomerRepositoryInterface, PaymentRepositoryInterface } from "../../../domain/repositories";

export class PrismaPaymentRepository implements PaymentRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient,
        private readonly customerRepository: CustomerRepositoryInterface
    ){}
    
    async create(paymentEntity: PaymentEntity): Promise<void> {
        const { customer, ...props } = paymentEntity.toJSON()
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