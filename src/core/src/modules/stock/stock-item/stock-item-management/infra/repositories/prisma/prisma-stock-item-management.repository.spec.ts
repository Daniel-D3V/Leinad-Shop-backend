import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { mock } from "jest-mock-extended"
import { PrismaStockItemManagementRepository } from "./prisma-stock-item-management.repository"
import { StockItemManagementEntity } from "../../../domain/entities"


describe("Test PrismaStockItemRepository", () => {

    let sut: PrismaStockItemManagementRepository
    let stockItemManagementEntity: StockItemManagementEntity

    beforeEach(async () => {    
        stockItemManagementEntity = mock<StockItemManagementEntity>({
            id: "any_id",
            announceItemId: "any_announce_id",
            toJSON: () => ({
                id: "any_id",
                stockItemType: "AUTO",
                announceItemId: "any_announce_id"
            })
        })
        sut = new PrismaStockItemManagementRepository(prismaClient)
        await prismaClient.stockItemManagement.deleteMany()
    })

    it("Should create a stockItem in database", async () => {
        await sut.create(stockItemManagementEntity)
        const stockItem = await prismaClient.stockItemManagement.findUnique({
            where: { id: stockItemManagementEntity.id }
        })
        expect(stockItem).toEqual(stockItemManagementEntity.toJSON())
    })

    it("Should findById", async () => {
        await sut.create(stockItemManagementEntity)
        const stockItem = await sut.findById(stockItemManagementEntity.id)
        expect(stockItem?.toJSON()).toEqual(stockItemManagementEntity.toJSON())
    })

    it("Should update a stockItem in database", async () => {
        await sut.create(stockItemManagementEntity)
        stockItemManagementEntity.changeToTypeNormal()
        await sut.update(stockItemManagementEntity)

        const stockItemFound = await sut.findById(stockItemManagementEntity.id)
        expect(stockItemFound?.toJSON()).toEqual(stockItemManagementEntity.toJSON())
    })

    it("Should findByAnnounceItemId", async () => {
        await sut.create(stockItemManagementEntity)
        const stockItem = await sut.findByAnnounceItemId(stockItemManagementEntity.announceItemId)
        expect(stockItem?.toJSON()).toEqual(stockItemManagementEntity.toJSON())
    })
    
})