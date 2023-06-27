import { PrismaClient } from "@prisma/client";
import { OrderPaymentCustomerEntity } from "../../../domain/entities";
import { OrderPaymentCustomerRepositoryInterface } from "../../../domain/repositories";

export class PrismaOrderPaymentCustomerRepository implements OrderPaymentCustomerRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async findById(id: string): Promise<OrderPaymentCustomerEntity | null> {
        const prismaCustomer = await this.prismaClient.user.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaCustomer) return null

        return OrderPaymentCustomerEntity.create({
            name: prismaCustomer.username,
            email: prismaCustomer.email,
        }, prismaCustomer.id)
    }


}