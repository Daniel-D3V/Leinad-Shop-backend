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

        sut = new PrismaStockItemManualRepository(prismaClient)
        await prismaClient.stockItemManual.deleteMany()
    })

    it("Should create a new StockItemManualEntity", async () => {

    })
})