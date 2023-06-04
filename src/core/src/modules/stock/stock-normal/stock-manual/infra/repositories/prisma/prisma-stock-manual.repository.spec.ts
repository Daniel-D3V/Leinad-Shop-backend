import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaStockManualRepository } from "./prisma-stock-manual.repository"
import { mock } from "jest-mock-extended"
import { StockManualEntity } from "../../../domain/entities"


describe("Test PrismaStockNormalRepository", () => {

    let sut: PrismaStockManualRepository
    let stockManualEntity: StockManualEntity

    beforeEach(async () => {
        stockManualEntity = mock<StockManualEntity>({
            id: "any_id",
            stockManagementId: "stock_management_id",
            toJSON: () => ({
                id: "any_id",
                stock: 10,
                stockManagementId: "any_stock_management_id"
            } as any),
            getCurrentStock: () => 10
        })
        sut = new PrismaStockManualRepository(prismaClient)
        await prismaClient.stockManual.deleteMany({})
    })

    it("Should create a stock manual", async () => {
        await sut.create(stockManualEntity)
        const prismaManualEntity = await prismaClient.stockManual.findUnique({
            where: {
                id: stockManualEntity.id
            }
        })
        expect(prismaManualEntity).toBeTruthy()
    })

    it("Should update a stock manual", async () => {
        await sut.create(stockManualEntity)
        const productStockNormal = await prismaClient.stockManual.findUnique({
            where: {
                id: stockManualEntity.id
            }
        })
        expect(productStockNormal?.stock).toBe(10)
    })

    it("Should find a stock manual by id", async () => {
        await sut.create(stockManualEntity)
        const stockNormal = await sut.findById(stockManualEntity.id)
        expect(stockNormal?.toJSON()).toEqual(stockManualEntity.toJSON())
    })

    it("Should return null stock manual does not exists", async () => {
        const stockManual = await sut.findById("any_id")
        expect(stockManual).toBeNull()
    })

    it("Should find a stock manual by stockManagementId", async () => {
        await sut.create(stockManualEntity)
        const productStockNormal = await sut.findByStockManagementId(stockManualEntity.stockManagementId)
        expect(productStockNormal?.toJSON()).toEqual(stockManualEntity.toJSON())
    })

    it("Should return null if stock manual does not exists", async () => {
        const stockNormal = await sut.findByStockManagementId(stockManualEntity.stockManagementId)
        expect(stockNormal).toBeNull()
    })

})

