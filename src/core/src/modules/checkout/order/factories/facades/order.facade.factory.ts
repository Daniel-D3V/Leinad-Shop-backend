import { PrismaClient } from "@prisma/client";
import { OrderFacadeInterface } from "../../facades";
import { OrderFacadeImp } from "../../infra/facades";
import { PrismaOrderRepository } from "../../infra/repositories";
import { OrderPaymentFacadeFactory } from "@/modules/checkout/payment/order-payment/factories";

export class OrderFacadeFactory {

    static create(prismaClient: PrismaClient): OrderFacadeInterface{

        const prismaOrderRepository = new PrismaOrderRepository(prismaClient)
        const orderPaymentFacade =  OrderPaymentFacadeFactory.create(prismaClient)
        const orderFacadeImp = new OrderFacadeImp(
            prismaOrderRepository,
            orderPaymentFacade
        )
        return orderFacadeImp
    }
}