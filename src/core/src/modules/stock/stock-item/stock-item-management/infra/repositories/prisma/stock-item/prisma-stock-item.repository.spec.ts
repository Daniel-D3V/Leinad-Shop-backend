import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaStockItemRepository } from "./prisma-stock-item.repository"
import { StockItemEntity } from "@/modules/stock/stock-item/domain/entities"
import { mock } from "jest-mock-extended"


describe("Test PrismaStockItemRepository", () => {

    let sut: PrismaStockItemRepository
    let stockItemEntity: StockItemEntity

    beforeEach(async () => {    
        stockItemEntity = mock<StockItemEntity>({
            id: "any_id",
            announceItemId: "any_announce_id",
            toJSON: () => ({
                id: "any_id",
                stockItemType: "AUTO",
                announceItemId: "any_announce_id"
            })
        })
        sut = new PrismaStockItemRepository(prismaClient)
        await prismaClient.stockItem.deleteMany()
    })

    it("Should create a stockItem in database", async () => {
        await sut.create(stockItemEntity)
        const stockItem = await prismaClient.stockItem.findUnique({
            where: { id: stockItemEntity.id }
        })
        expect(stockItem).toEqual(stockItemEntity.toJSON())
    })

    it("Should findById", async () => {
        await sut.create(stockItemEntity)
        const stockItem = await sut.findById(stockItemEntity.id)
        expect(stockItem?.toJSON()).toEqual(stockItemEntity.toJSON())
    })

    it("Should update a stockItem in database", async () => {
        await sut.create(stockItemEntity)
        stockItemEntity.changeToTypeNormal()
        await sut.update(stockItemEntity)

        const stockItemFound = await sut.findById(stockItemEntity.id)
        expect(stockItemFound?.toJSON()).toEqual(stockItemEntity.toJSON())
    })

    it("Should findByAnnounceItemId", async () => {
        await sut.create(stockItemEntity)
        const stockItem = await sut.findByAnnounceItemId(stockItemEntity.announceItemId)
        expect(stockItem?.toJSON()).toEqual(stockItemEntity.toJSON())
    })
    
})