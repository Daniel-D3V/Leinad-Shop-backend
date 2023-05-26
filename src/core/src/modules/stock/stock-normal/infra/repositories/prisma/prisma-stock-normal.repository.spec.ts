import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaStockNormalRepository } from "./prisma-stock-normal.repository"
import { mock } from "jest-mock-extended"
import { StockNormalEntity } from "../../../domain/entities"


describe("Test PrismaStockNormalRepository", () => {

    let sut: PrismaStockNormalRepository
    let stockNormalEntity: StockNormalEntity

    beforeEach(async () => {
        stockNormalEntity = mock<StockNormalEntity>({
            id: "any_id",
            announceId: "any_announce_id",
            toJSON: () => ({
                id: "any_id",
                stock: 10,
                announceId: "any_announce_id"
            } as any),
            getCurrentStock: () => 10
        })
        sut = new PrismaStockNormalRepository(prismaClient)
        await prismaClient.stockNormal.deleteMany({})
    })

    it("Should create a stock normal", async () => {
        await sut.create(stockNormalEntity)
        const productStockNormal = await prismaClient.stockNormal.findUnique({
            where: {
                id: stockNormalEntity.id
            }
        })
        expect(productStockNormal).toBeTruthy()
    })

    it("Should update a stock normal", async () => {
        await sut.create(stockNormalEntity)
        const productStockNormal = await prismaClient.stockNormal.findUnique({
            where: {
                id: stockNormalEntity.id
            }
        })
        expect(productStockNormal?.stock).toBe(10)
    })

    it("Should find a stock normal by id", async () => {
        await sut.create(stockNormalEntity)
        const productStockNormal = await sut.findById(stockNormalEntity.id)
        expect(productStockNormal?.toJSON()).toEqual(stockNormalEntity.toJSON())
    })

    it("Should return null if product stock normal does not exists", async () => {
        const stockNormal = await sut.findById("any_id")
        expect(stockNormal).toBeNull()
    })

    it("Should find a stock normal by announce id", async () => {
        await sut.create(stockNormalEntity)
        const productStockNormal = await sut.findByAnnounceId(stockNormalEntity.announceId)
        expect(productStockNormal?.toJSON()).toEqual(stockNormalEntity.toJSON())
    })

    it("Should return null if product stock normal does not exists", async () => {
        const stockNormal = await sut.findByAnnounceId("any_announce_id")
        expect(stockNormal).toBeNull()
    })

})