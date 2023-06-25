import { PrismaClient } from "@prisma/client";
import { CustomerEntity } from "../../../domain/entities";
import { CustomerRepositoryInterface } from "../../../domain/repositories";

export class PrismaCustomerRepository implements CustomerRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async findById(id: string): Promise<CustomerEntity | null> {
        const prismaCustomer = await this.prismaClient.user.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaCustomer) return null

        return CustomerEntity.create({
            name: prismaCustomer.username,
            email: prismaCustomer.email,
        }, prismaCustomer.id)
    }


}