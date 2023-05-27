import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaStockItemNormalRepository } from "./prisma-stock-item-normal.repository"
import { StockItemNormalEntity } from "@/modules/stock/_base"
import { mock } from "jest-mock-extended"

describe("Test PrismaStockItemNormalRepository", () => {

    let sut: PrismaStockItemNormalRepository
    let stockItemNormalEntity: StockItemNormalEntity

    beforeEach( async() => {
        stockItemNormalEntity = mock<StockItemNormalEntity>({
            id: "any_id",
            stockItemId: "any_stock_item_id",
            toJSON: () => ({
                id: "any_id",
                stock: 10,
                stockItemId: "any_stock_item_id"
            })
        })
        sut = new PrismaStockItemNormalRepository(prismaClient)
        await prismaClient.stockItemNormal.deleteMany()
    })

    it("Should create a stockItemNormal in database", async () => {
        await sut.create(stockItemNormalEntity)
        const stockItemNormal = await prismaClient.stockItemNormal.findUnique({
            where: { id: stockItemNormalEntity.id }
        })
        expect(stockItemNormal).toEqual(stockItemNormalEntity.toJSON())
    })

    it("Should findById", async () => {
        await sut.create(stockItemNormalEntity)
        const stockItemNormal = await sut.findById(stockItemNormalEntity.id)
        expect(stockItemNormal?.toJSON()).toEqual(stockItemNormalEntity.toJSON())
    })

    it("Should return null if findById not found", async () => {
        const stockItemNormal = await sut.findById("any_id")
        expect(stockItemNormal).toBeNull()
    })

    it("Should find by stockItemId", async () => {
        await sut.create(stockItemNormalEntity)
        const stockItemNormal = await sut.findByStockItemId(stockItemNormalEntity.stockItemId)
        expect(stockItemNormal?.toJSON()).toEqual(stockItemNormalEntity.toJSON())
    })

    it("Should return null if findByStockItemId not found", async () => {
        const stockItemNormal = await sut.findByStockItemId("any_stock_item_id")
        expect(stockItemNormal).toBeNull()
    })

    it("Should update a stockItemNormal in database", async () => {
        await sut.create(stockItemNormalEntity)
        stockItemNormalEntity.updateStock(15)
        await sut.update(stockItemNormalEntity)

        const stockItemNormalFound = await sut.findById(stockItemNormalEntity.id)
        expect(stockItemNormalFound?.toJSON()).toEqual(stockItemNormalEntity.toJSON())
    })
})