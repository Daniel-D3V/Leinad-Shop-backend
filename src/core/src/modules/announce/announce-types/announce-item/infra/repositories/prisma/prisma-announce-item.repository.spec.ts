import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { AnnounceItemEntity } from "../../../domain/entities"
import { PrismaAnnounceItemRepository } from "./prisma-announce-item.repository"
import { mock } from "jest-mock-extended"


describe("Test PrismaAnnounceItemRepository", () => {


    let sut: PrismaAnnounceItemRepository
    let announceItemEntity: AnnounceItemEntity

    beforeEach(async () => {

        announceItemEntity = mock<AnnounceItemEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                title: "any_title",
                price: 1,
                announceId: "any_announce_id"
            })
        })

        sut = new PrismaAnnounceItemRepository(prismaClient)

        await prismaClient.announceItem.deleteMany()
    })

    it("should create a announce item", async () => {
        await sut.create(announceItemEntity)

        const announceItem = await prismaClient.announceItem.findUnique({
            where: { id: announceItemEntity.id } 
        })
        expect(announceItem).toEqual(announceItemEntity.toJSON())
    })
})