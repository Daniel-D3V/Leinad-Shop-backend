import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaProductStockRepository } from "./prisma-product-stock.repository"


describe("Test PrismaProductStockRepository", () => {

    let sut: PrismaProductStockRepository
    let id: string

    beforeEach(() => {
        id = "any_announce_id"
        sut = new PrismaProductStockRepository(prismaClient)
    })

    const create = () =>{
        prismaClient.announce.create({
            data: {
                id
            }
        })
    }

    it("Should", () => {})
})