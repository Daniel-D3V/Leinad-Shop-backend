import { PrismaClient } from "@prisma/client";
import { OrderPaymentFacadeInterface } from "../../facades";
import { OrderPaymentFacadeImp } from "../../infra/facades";
import { PrismaOrderPaymentCustomerRepository, PrismaOrderPaymentRepository } from "../../infra/repositories";


export class OrderPaymentFacadeFactory {

    static create(prismaClient: PrismaClient): OrderPaymentFacadeInterface { 
        
        const prismaOrderPaymentCustomerRepository = new PrismaOrderPaymentCustomerRepository(prismaClient)
        const prismaOrderPaymentRepository = new PrismaOrderPaymentRepository(
            prismaClient,
            prismaOrderPaymentCustomerRepository
        )
        const orderPaymentFacadeImp = new OrderPaymentFacadeImp(
            prismaOrderPaymentRepository
        )
        return orderPaymentFacadeImp
    }
}