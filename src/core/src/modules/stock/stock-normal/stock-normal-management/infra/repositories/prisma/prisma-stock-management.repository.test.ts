import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaStockManagementRepository } from "./prisma-stock-management.repository"
import { StockNormalManagementEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"



describe("Test PrismaStockManagementRepository", () => {

    let sut: PrismaStockManagementRepository
    let id: string
    let stockNormalManagementEntity: StockNormalManagementEntity

    beforeEach(async () => {
        id = "any_announce_id"
        stockNormalManagementEntity = mock<StockNormalManagementEntity>({
            announceNormalId: "any_announce_normal_id",
            toJSON: () => ({
                id,
                announceNormalId: "any_announce_normal_id",
                stockType: "AUTO"
            })
        })
        sut = new PrismaStockManagementRepository(prismaClient)
        await prismaClient.stockNormalManagement.deleteMany()
    })

    it("Should create a new stock management", async () => {
        await sut.create(stockNormalManagementEntity)
        const entityFound = await prismaClient.stockNormalManagement.findFirst({
            where: { id }
        })
        expect(entityFound).toBeTruthy()
        expect(entityFound).toEqual(stockNormalManagementEntity.toJSON())
    })

    it("Should find a stockManagement", async () => {
        await sut.create(stockNormalManagementEntity)
        const entityFound = await sut.findById(id)

        expect(entityFound?.toJSON()).toEqual(stockNormalManagementEntity?.toJSON())
    })

    it("Should return null if stockManagement does not exists", async () => {
        const entityFound = await sut.findById(id)
        expect(entityFound).toBeNull()
    })

    it("Should find a stockManagement by announceId", async () => {
        await sut.create(stockNormalManagementEntity)
        const entityFound = await sut.findByAnnounceNormalId(stockNormalManagementEntity.announceNormalId)

        expect(entityFound?.toJSON()).toEqual(stockNormalManagementEntity?.toJSON())
    })

    it("Should return null if stockManagement does not exists found by announceId", async () => {
        const entityFound = await sut.findByAnnounceNormalId(id)
        expect(entityFound).toBeNull()
    })

    it("Should update a product stock", async () => {
        await sut.create(stockNormalManagementEntity)
        const entityFound = await sut.findById(id)
        expect(entityFound?.stockType).toBe("AUTO")
        entityFound?.toStockNormal()
        await sut.update(entityFound!)
        const entityUpdated = await sut.findById(id)
        expect(entityUpdated?.stockType).toBe("NORMAL")

    })


})