import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaStockItemAutoRepository } from "./prisma-stock-item-auto.respository"
import { StockItemAutoEntity } from "@/modules/stock/_base"
import { mock } from "jest-mock-extended"


describe("Test PrismaStockItemAutoRepository", () => {

    let sut: PrismaStockItemAutoRepository
    let stockItemAutoEntity: StockItemAutoEntity

    beforeEach(async () => {
        stockItemAutoEntity = mock<StockItemAutoEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                value: "any_value",
                stockItemId: "any_stock_item_id",
            })
        })
        sut = new PrismaStockItemAutoRepository(prismaClient)
        await prismaClient.stockItemAuto.deleteMany()
    })

    it("should create a stock item auto", async () => {
        await sut.create(stockItemAutoEntity)
        const stockItemAuto = await prismaClient.stockItemAuto.findFirst({
            where: { id: stockItemAutoEntity.id }
        })
        expect(stockItemAuto).toEqual(stockItemAutoEntity.toJSON())
    })

    it("should delete a stock item auto", async () => {
        await sut.create(stockItemAutoEntity)
        await sut.delete(stockItemAutoEntity.id)
        const stockItemAuto = await prismaClient.stockItemAuto.findFirst({
            where: { id: stockItemAutoEntity.id }
        })
        expect(stockItemAuto).toBeNull()
    })

    it("should find a stock item auto by id", async () => {
        await sut.create(stockItemAutoEntity)
        const stockItemAuto = await sut.findById(stockItemAutoEntity.id)
        expect(stockItemAuto?.toJSON()).toEqual(stockItemAutoEntity.toJSON())
    })

    it("should update a stock item auto", async () => {
        await sut.create(stockItemAutoEntity)
        stockItemAutoEntity.changeValue("new_value")
        await sut.update(stockItemAutoEntity)
        const updatedStockItemAuto = await sut.findById(stockItemAutoEntity.id)
        expect(updatedStockItemAuto?.toJSON()).toEqual(stockItemAutoEntity?.toJSON())
    })


})