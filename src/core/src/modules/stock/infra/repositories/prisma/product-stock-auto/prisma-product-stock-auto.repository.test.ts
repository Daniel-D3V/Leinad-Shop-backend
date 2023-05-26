import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaProductStockAutoRepository } from "./prisma-product-stock-auto.repository"
import { ProductStockAutoEntity } from "@/modules/stock/domain/entities"
import { mock } from "jest-mock-extended"


describe("Test PrismaProductStockAutoRepository", () => {

    let sut: PrismaProductStockAutoRepository
    let productStockRepository: ProductStockAutoEntity

    beforeEach(async () => {
        productStockRepository = mock<ProductStockAutoEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                productStockId: "any_product_stock_id",
                value: "any_value"
            })
        })
        sut = new PrismaProductStockAutoRepository(prismaClient)
        await prismaClient.productStockAuto.deleteMany({})
    })

    it("Should create a product stock auto", async () => {
        await sut.create(productStockRepository)
        const productStockAutoEntityFound = await sut.findById(productStockRepository.id)
        expect(productStockAutoEntityFound?.toJSON()).toEqual(productStockRepository.toJSON())
    })

    it("Should find a product stock auto by id", async () => {
        await sut.create(productStockRepository)
        const productStockAutoEntityFound = await sut.findById(productStockRepository.id)
        expect(productStockAutoEntityFound?.toJSON()).toEqual(productStockRepository.toJSON())
    })

    it("Should return null if product stock auto does not exists", async () => {
        const productStockAutoEntityFound = await sut.findById("any_id")
        expect(productStockAutoEntityFound).toBeNull()
    })

    it("Should delete a product stock auto", async () => {
        await sut.create(productStockRepository)
        await sut.delete(productStockRepository.id)
        const productStockAutoEntityFound = await sut.findById(productStockRepository.id)
        expect(productStockAutoEntityFound).toBeNull()
    })

    it("Should update a product stock auto", async () => {
        await sut.create(productStockRepository)
        const updatedProductStockAutoEntityFound = await sut.findById(productStockRepository.id)
        updatedProductStockAutoEntityFound?.changeValue("any_new_value")

        await sut.update(updatedProductStockAutoEntityFound!)
        const productStockAutoEntityFound = await sut.findById(productStockRepository.id)

        expect(productStockAutoEntityFound?.toJSON()).toEqual(updatedProductStockAutoEntityFound?.toJSON())
    })
})