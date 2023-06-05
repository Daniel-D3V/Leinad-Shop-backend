import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaStockItemManualRepository } from "./prisma-stock-item-manual.repository"
import { StockItemManualEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"


describe("Test PrismaStockItemManualRepository", () => {

    let sut: PrismaStockItemManualRepository
    let stockItemManualEntity: StockItemManualEntity

    beforeEach(async () => {

        stockItemManualEntity = mock<StockItemManualEntity>({
            id: "any_id",
            stockItemManagementId: "any_stock_item_management_id",
            toJSON: () => ({
                id: "any_id",
                stock: 10,
                stockItemManagementId: "any_stock_item_management_id"
            })
        })
//
        sut = new PrismaStockItemManualRepository(prismaClient)
        await prismaClient.stockItemManual.deleteMany({})
    })

    afterEach( async () => {
        await prismaClient.stockItemManual.deleteMany({})
    })

    it("Should create a new StockItemManualEntity", async () => {    
        await sut.create(stockItemManualEntity)
        const prismaItemManual = await prismaClient.stockItemManual.findUnique({
            where: { id: stockItemManualEntity.id }
        })
        expect(prismaItemManual).toEqual(stockItemManualEntity.toJSON())
    })

    it("Should return a StockItemManualEntity by stockItemManagementId", async () => {
        await sut.create(stockItemManualEntity)
        const stockItemManual = await sut.findByStockItemManagementId(stockItemManualEntity.stockItemManagementId)
        expect(stockItemManual?.toJSON()).toEqual(stockItemManualEntity.toJSON())
    })

    it("Should return null if StockItemManualEntity not found by stockItemManagementId", async () => {
        const stockItemManual = await sut.findByStockItemManagementId(stockItemManualEntity.stockItemManagementId)
        expect(stockItemManual).toBeNull()
    })

    it("Should return a StockItemManualEntity by id", async () => {
        await sut.create(stockItemManualEntity)
        const stockItemManual = await sut.findById(stockItemManualEntity.id)
        expect(stockItemManual?.toJSON()).toEqual(stockItemManualEntity.toJSON())
    })


    it("Should return null if StockItemManualEntity not found by id", async () => {
        const stockItemManual = await sut.findById(stockItemManualEntity.id)
        expect(stockItemManual).toBeNull()
    })
})