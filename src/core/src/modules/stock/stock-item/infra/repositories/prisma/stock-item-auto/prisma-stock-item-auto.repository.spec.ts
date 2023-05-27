import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaStockItemAutoRepository } from "./prisma-stock-item-auto.respository"
import { StockItemAutoEntity } from "@/modules/stock/_base"
import { mock } from "jest-mock-extended"


describe("Test PrismaStockItemAutoRepository", () => {

    let sut: PrismaStockItemAutoRepository
    let stockItemAutoEntity: StockItemAutoEntity

    beforeEach(async () => {
        stockItemAutoEntity = mock<StockItemAutoEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                value: "any_value",
                stockItemId: "any_stock_item_id",
            })
        })
        sut = new PrismaStockItemAutoRepository(prismaClient)
        await prismaClient.stockItemAuto.deleteMany()
    })
})