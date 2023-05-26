import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaStockManagementRepository } from "./prisma-stock-management.repository"
import { StockManagementEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"



describe("Test PrismaStockManagementRepository", () => {

    let sut: PrismaStockManagementRepository
    let id: string
    let stockManagementEntity: StockManagementEntity

    beforeEach(async () => {
        id = "any_announce_id"
        stockManagementEntity = mock<StockManagementEntity>({
            toJSON: () => ({
                id,
                announceId: "any_announce_id",
                stockType: "AUTO"
            })
        })
        sut = new PrismaStockManagementRepository(prismaClient)
        await prismaClient.stockManagement.deleteMany()
    })

    it("Should create a new stock management", async () => {
        await sut.create(stockManagementEntity)
        const entityFound = await prismaClient.stockManagement.findFirst({
            where: { id }
        })
        expect(entityFound).toBeTruthy()
        expect(entityFound).toEqual(stockManagementEntity.toJSON())
    })

    it("Should find a stockManagement", async () => {
        await sut.create(stockManagementEntity)
        const entityFound = await sut.findById(id)

        expect(entityFound?.toJSON()).toEqual(stockManagementEntity?.toJSON())
    })

    it("Should return null if stockManagement does not exists", async () => {
        const entityFound = await sut.findById(id)
        expect(entityFound).toBeNull()
    })

    it("Should find a stockManagement by announceId", async () => {
        await sut.create(stockManagementEntity)
        const entityFound = await sut.findByAnnounceId(id)

        expect(entityFound?.toJSON()).toEqual(stockManagementEntity?.toJSON())
    })

    it("Should return null if stockManagement does not exists found by announceId", async () => {
        const entityFound = await sut.findByAnnounceId(id)
        expect(entityFound).toBeNull()
    })

    it("Should update a product stock", async () => {
        await sut.create(stockManagementEntity)
        const entityFound = await sut.findById(id)
        expect(entityFound?.stockType).toBe("AUTO")
        entityFound?.toStockNormal()
        await sut.update(entityFound!)
        const entityUpdated = await sut.findById(id)
        expect(entityUpdated?.stockType).toBe("NORMAL")

    })


})