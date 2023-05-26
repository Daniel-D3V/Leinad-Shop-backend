import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { mock } from "jest-mock-extended"
import { StockAutoEntity } from "../../../domain/entities"
import { PrismaStockAutoRepository } from "./prisma-stock-auto.repository"


describe("Test PrismaStockAutoRepository", () => {

    let sut: PrismaStockAutoRepository
    let stockAutoEntity: StockAutoEntity

    beforeEach(async () => {
        stockAutoEntity = mock<StockAutoEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                announceId: "any_product_stock_id",
                value: "any_value"
            })
        })
        sut = new PrismaStockAutoRepository(prismaClient)
        await prismaClient.stockAuto.deleteMany({})
    })

    it("Should create a stock auto", async () => {
        await sut.create(stockAutoEntity)
        const productStockAutoEntityFound = await sut.findById(stockAutoEntity.id)
        expect(productStockAutoEntityFound?.toJSON()).toEqual(stockAutoEntity.toJSON())
    })

    it("Should find a stock auto by id", async () => {
        await sut.create(stockAutoEntity)
        const stockAutoEntityFound = await sut.findById(stockAutoEntity.id)
        expect(stockAutoEntityFound?.toJSON()).toEqual(stockAutoEntity.toJSON())
    })

    it("Should return null if stock auto does not exists", async () => {
        const stockAutoEntityFound = await sut.findById("any_id")
        expect(stockAutoEntityFound).toBeNull()
    })

    it("Should delete a product stock auto", async () => {
        await sut.create(stockAutoEntity)
        await sut.delete(stockAutoEntity.id)
        const productStockAutoEntityFound = await sut.findById(stockAutoEntity.id)
        expect(productStockAutoEntityFound).toBeNull()
    })

    it("Should update a product stock auto", async () => {
        await sut.create(stockAutoEntity)
        const updatedStockAutoEntityFound = await sut.findById(stockAutoEntity.id)
        updatedStockAutoEntityFound?.changeValue("any_new_value")

        await sut.update(updatedStockAutoEntityFound!)
        const productStockAutoEntityFound = await sut.findById(stockAutoEntity.id)

        expect(productStockAutoEntityFound?.toJSON()).toEqual(updatedStockAutoEntityFound?.toJSON())
    })
})