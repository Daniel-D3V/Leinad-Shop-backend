import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { mock } from "jest-mock-extended"
import { StockNormalAutoEntity } from "../../../domain/entities"
import { PrismaStockNormalAutoRepository } from "./prisma-stock-auto.repository"

describe("Test PrismaStockAutoRepository", () => {

    let sut: PrismaStockNormalAutoRepository
    let stockNormalAutoEntity: StockNormalAutoEntity

    beforeEach(async () => {
        stockNormalAutoEntity = mock<StockNormalAutoEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                value: "any_value",
                announceNormalId: "any_announce_normal_id"
            })
        })
        sut = new PrismaStockNormalAutoRepository(prismaClient)
        await prismaClient.stockNormalAuto.deleteMany({})
    })

    it("Should create a stock auto", async () => {
        await sut.create(stockNormalAutoEntity)
        const productStockAutoEntityFound = await sut.findById(stockNormalAutoEntity.id)
        expect(productStockAutoEntityFound?.toJSON()).toEqual(stockNormalAutoEntity.toJSON())
    })

    it("Should find a stock auto by id", async () => {
        await sut.create(stockNormalAutoEntity)
        const stockAutoEntityFound = await sut.findById(stockNormalAutoEntity.id)
        expect(stockAutoEntityFound?.toJSON()).toEqual(stockNormalAutoEntity.toJSON())
    })

    it("Should return null if stock auto does not exists", async () => {
        const stockAutoEntityFound = await sut.findById("any_id")
        expect(stockAutoEntityFound).toBeNull()
    })

    it("Should delete a product stock auto", async () => {
        await sut.create(stockNormalAutoEntity)
        await sut.delete(stockNormalAutoEntity.id)
        const productStockAutoEntityFound = await sut.findById(stockNormalAutoEntity.id)
        expect(productStockAutoEntityFound).toBeNull()
    })

    it("Should update a product stock auto", async () => {
        await sut.create(stockNormalAutoEntity)
        const updatedStockAutoEntityFound = await sut.findById(stockNormalAutoEntity.id)
        updatedStockAutoEntityFound?.changeValue("any_new_value")

        await sut.update(updatedStockAutoEntityFound!)
        const productStockAutoEntityFound = await sut.findById(stockNormalAutoEntity.id)

        expect(productStockAutoEntityFound?.toJSON()).toEqual(updatedStockAutoEntityFound?.toJSON())
    })
})