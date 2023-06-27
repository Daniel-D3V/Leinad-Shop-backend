import { PrismaClient } from "@prisma/client";
import { OrderPaymentRepositoryInterface } from "../../domain/repositories";
import { PrismaOrderPaymentCustomerRepository, PrismaOrderPaymentRepository } from "../../infra/repositories";

export class PrismaOrderPaymentRepositoryFactory {

    static create(prismaClient: PrismaClient): OrderPaymentRepositoryInterface {
        const prismaOrderPaymentCustomerRepository = new PrismaOrderPaymentCustomerRepository(prismaClient)
        const prismaOrderPaymentRepository = new PrismaOrderPaymentRepository(
            prismaClient,
            prismaOrderPaymentCustomerRepository
        )
        return prismaOrderPaymentRepository
    }
}