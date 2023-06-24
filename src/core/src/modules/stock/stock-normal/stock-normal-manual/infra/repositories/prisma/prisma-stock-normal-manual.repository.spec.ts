import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaStockNormalManualRepository } from "./prisma-stock-normal-manual.repository"
import { mock } from "jest-mock-extended"
import { StockNormalManualEntity } from "../../../domain/entities"


describe("Test PrismaStockNormalRepository", () => {

    let sut: PrismaStockNormalManualRepository
    let stockNormalManualEntity: StockNormalManualEntity

    beforeEach(async () => {
        stockNormalManualEntity = mock<StockNormalManualEntity>({
            id: "any_id",
            announceNormalId: "any_announce_normal_id",
            toJSON: () => ({
                id: "any_id",
                stock: 10,
                announceNormalId: "any_announce_normal_id"
            } as any),
            getCurrentStock: () => 10
        })
        sut = new PrismaStockNormalManualRepository(prismaClient)
        await prismaClient.stockNormalManual.deleteMany({})
    })

    it("Should create a stock manual", async () => {
        await sut.create(stockNormalManualEntity)
        const prismaManualEntity = await prismaClient.stockNormalManual.findUnique({
            where: {
                id: stockNormalManualEntity.id
            }
        })
        expect(prismaManualEntity).toBeTruthy()
    })

    it("Should update a stock manual", async () => {
        await sut.create(stockNormalManualEntity)
        const productStockNormal = await prismaClient.stockNormalManual.findUnique({
            where: {
                id: stockNormalManualEntity.id
            }
        })
        expect(productStockNormal?.stock).toBe(10)
    })

    it("Should find a stock manual by id", async () => {
        await sut.create(stockNormalManualEntity)
        const stockNormal = await sut.findById(stockNormalManualEntity.id)
        expect(stockNormal?.toJSON()).toEqual(stockNormalManualEntity.toJSON())
    })

    it("Should return null stock manual does not exists", async () => {
        const stockManual = await sut.findById("any_id")
        expect(stockManual).toBeNull()
    })

    it("Should find a stock manual by stockManagementId", async () => {
        await sut.create(stockNormalManualEntity)
        const productStockNormal = await sut.findByAnnounceNormalId(stockNormalManualEntity.announceNormalId)
        expect(productStockNormal?.toJSON()).toEqual(stockNormalManualEntity.toJSON())
    })

    it("Should return null if stock manual does not exists", async () => {
        const stockNormal = await sut.findByAnnounceNormalId(stockNormalManualEntity.announceNormalId)
        expect(stockNormal).toBeNull()
    })//

})

