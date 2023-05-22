import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaProductStockRepository } from "./prisma-product-stock.repository"


describe("Test PrismaProductStockRepository", () => {

    let sut: PrismaProductStockRepository
    let id: string

    beforeEach(async () => {
        id = "any_announce_id"
        sut = new PrismaProductStockRepository(prismaClient)
        await prismaClient.announce.deleteMany()
    })

    const create = async () =>{
        await prismaClient.announce.create({
            data: {
                id,
                stockType: "AUTO"
            }
        })
    }

    it("Should find a product stock", async () => {
        await create()
        const entityFound = await sut.findById(id)

        expect(entityFound?.toJSON()).toEqual({
            id,
            stockType: "AUTO"
        })
    })
})