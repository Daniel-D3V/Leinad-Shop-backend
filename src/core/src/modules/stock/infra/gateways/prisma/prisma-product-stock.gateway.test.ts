import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaProductStockGateway } from "./prisma-product-stock.gateway"
import { randomUUID } from "crypto"

describe("Test PrismaProductStockGateway", () => {

    let sut: PrismaProductStockGateway
    let productStockId: string

    beforeEach(async () => {
        productStockId = "any_id"
        sut = new PrismaProductStockGateway(prismaClient)
        await prismaClient.productStockNormal.deleteMany({})
        await prismaClient.productStockAuto.deleteMany({})
    })

    const createProductStockNormal = async (stockCount: number) => {
        await prismaClient.productStockNormal.create({
            data: {
                id: productStockId,
                announceId: productStockId,
                stock: stockCount
            }
        })
    } 

    const createProductStockAuto = async () => {
        await prismaClient.productStockAuto.create({
            data: {
                id: randomUUID(),
                announceId: productStockId,
            }
        })
    } 

    it("Should get the productStock normal count", async () => {
        await createProductStockNormal(10)
        const productStock = await sut.getProductStockNormalCount(productStockId)
        expect(productStock).toBe(10)
    })

    it("Should get the productStock auto count", async () => {
        for(let i = 0; i < 13; i++){
            await createProductStockAuto()
        }
        const productStock = await sut.getProductStockAutoCount(productStockId)
        expect(productStock).toBe(13)
    })

    it("Should return 0 if productStock normal not found", async () => {
        const productStock = await sut.getProductStockNormalCount(productStockId)
        expect(productStock).toBe(0)
    })

    it("Should return 0 if productStock auto not found", async () => {
        const productStock = await sut.getProductStockAutoCount(productStockId)
        expect(productStock).toBe(0)
    })
})