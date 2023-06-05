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
})