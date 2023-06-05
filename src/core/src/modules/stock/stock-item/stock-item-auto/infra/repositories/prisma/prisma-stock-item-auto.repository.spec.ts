import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { StockItemAutoEntity } from "../../../domain/entities"
import { PrismaStockItemAutoRepository } from "./prisma-stock-item-auto.repository"
import { mock } from "jest-mock-extended"


describe("Test PrismaStockItemAutoRepository", () => {

    let sut: PrismaStockItemAutoRepository
    let stockItemAutoEntity: StockItemAutoEntity
    
    
    beforeEach(async() => {

        stockItemAutoEntity = mock<StockItemAutoEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                value: "any_value",
                stockItemManagementId: "any_stock_item_management_id"
            })
        })
        sut = new PrismaStockItemAutoRepository(prismaClient)

        await prismaClient.stockItemAuto.deleteMany({})
    })

    it("Should create a stock item auto", async() => {
        await sut.create(stockItemAutoEntity)
        const stockItemAuto = await prismaClient.stockItemAuto.findUnique({
            where: { id: stockItemAutoEntity.id }
        })
        expect(stockItemAuto).toEqual(stockItemAutoEntity.toJSON())
    })

    it("Should find a stock item auto by id", async() => {
        await sut.create(stockItemAutoEntity)
        const foundStockItemAutoEntity = await sut.findById(stockItemAutoEntity.id)
        expect(foundStockItemAutoEntity?.toJSON()).toEqual(stockItemAutoEntity.toJSON())
    })

    it("Should return null if stock item auto not found", async() => {
        const foundStockItemAutoEntity = await sut.findById(stockItemAutoEntity.id)
        expect(foundStockItemAutoEntity).toBeNull()
    })
    
    it("Should update a stock item auto", async() => {
        await sut.create(stockItemAutoEntity)
        stockItemAutoEntity.changeValue("any_other_value")
        await sut.update(stockItemAutoEntity)
        const updatedStockItemAutoEntity = await sut.findById(stockItemAutoEntity.id)
        expect(updatedStockItemAutoEntity?.toJSON()).toEqual(stockItemAutoEntity.toJSON())
    })

    it("Should delete a stock item auto", async() => {
        await sut.create(stockItemAutoEntity)
        await sut.delete(stockItemAutoEntity.id)
        const deletedStockItemAutoEntity = await sut.findById(stockItemAutoEntity.id)
        expect(deletedStockItemAutoEntity).toBeNull()
    })

})