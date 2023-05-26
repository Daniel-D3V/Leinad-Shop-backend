import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaProductStockNormalRepository } from "./prisma-product-stock-normal.repository"
import { ProductStockNormalEntity } from "@/modules/stock/domain/entities"
import { mock } from "jest-mock-extended"


describe("Test PrismaProductStockNormalRepository", () => {

    let sut: PrismaProductStockNormalRepository
    let productStockNormalEntity: ProductStockNormalEntity

    beforeEach(async () => {
        productStockNormalEntity = mock<ProductStockNormalEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                stock: 10
            }),
            getCurrentStock: () => 10
        })
        sut = new PrismaProductStockNormalRepository(prismaClient)
        await prismaClient.productStockNormal.deleteMany({})
    })

    it("Should create a product stock normal", async () => {
        await sut.create(productStockNormalEntity)
        const productStockNormal = await prismaClient.productStockNormal.findUnique({
            where: {
                id: productStockNormalEntity.id
            }
        })
        expect(productStockNormal).toBeTruthy()
    })

    it("Should update a product stock normal", async () => {
        await sut.create(productStockNormalEntity)
        const productStockNormal = await prismaClient.productStockNormal.findUnique({
            where: {
                id: productStockNormalEntity.id
            }
        })
        expect(productStockNormal?.stock).toBe(10)
    })

    it("Should find a product stock normal by id", async () => {
        await sut.create(productStockNormalEntity)
        const productStockNormal = await sut.findById(productStockNormalEntity.id)
        expect(productStockNormal?.toJSON()).toEqual(productStockNormalEntity.toJSON())
    })

    it("Should return null if product stock normal does not exists", async () => {
        const productStockNormal = await sut.findById("any_id")
        expect(productStockNormal).toBeNull()
    })

})