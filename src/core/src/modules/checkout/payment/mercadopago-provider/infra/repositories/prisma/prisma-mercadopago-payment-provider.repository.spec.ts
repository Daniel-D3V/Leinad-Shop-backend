import { mock } from "jest-mock-extended"
import { MercadopagoPaymentProviderEntity } from "../../../domain/entities"
import { PrismaMercadopagoPaymentProviderRepository } from "./prisma-mercadopago-payment-provider.repository"
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"


describe('Test PrismaMercadopagoPaymentProviderRepository', () => { 

    let sut: PrismaMercadopagoPaymentProviderRepository
    let mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity

    beforeEach( async() => {

        mercadopagoPaymentProviderEntity = mock<MercadopagoPaymentProviderEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                amount: 100,
                mercadopagoPaymentId: "any_mercadopago_payment_id",
                orderPaymentId: "any_order_payment_id",
                status: "APPROVED"
            })
        })
        sut = new PrismaMercadopagoPaymentProviderRepository(prismaClient)

        await prismaClient.mercadopagoPaymentProvider.deleteMany()
    })

    it("Should create a new payment", async () => {
        await sut.create(mercadopagoPaymentProviderEntity)
        
        const prismaMercadopagoPaymentProvider = await prismaClient.mercadopagoPaymentProvider.findUnique({
            where: { id: mercadopagoPaymentProviderEntity.id }
        })
        expect(prismaMercadopagoPaymentProvider).toEqual(mercadopagoPaymentProviderEntity.toJSON())
    })

})