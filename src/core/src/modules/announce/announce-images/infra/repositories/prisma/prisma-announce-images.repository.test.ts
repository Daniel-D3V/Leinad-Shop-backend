import { mock } from "jest-mock-extended"
import { AnnounceImageEntity } from "../../../domain/entities"
import { PrismaAnnounceImagesRepository } from "./prisma-announce-images.repository"
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"


describe("Test PrismaAnnounceImagesRepository", () => {

    let sut: PrismaAnnounceImagesRepository
    let announceImageEntity: AnnounceImageEntity
    let images: any

    beforeEach(async () => {
        images = [ 
            { url: "any_url_1", weight: 1 },
            { url: "any_url_2", weight: 2 } 
        ]
        announceImageEntity = mock<AnnounceImageEntity>({
            id: "any_id",
            images
        })
        sut = new PrismaAnnounceImagesRepository()
        await prismaClient.announceImages.deleteMany({ where: { announceId: "any_id" } })
    })

    it("fs", () => {})
    // it("Should update the announceImageEntity", async () => {
    //     await sut.update(announceImageEntity)
    //     const prismaAnnounceImage = await prismaClient.announceImages.findMany({
    //         where: { announceId: "any_id" },
    //         orderBy: { weight: "asc" }
    //     })
    //     const { url, weight } = prismaAnnounceImage[0]
    //     const { url: url2, weight: weight2 } = prismaAnnounceImage[1]
    //     expect(images[0]).toMatchObject({ url, weight })
    //     expect(images[1]).toMatchObject({ url: url2, weight: weight2 })
    // })

    // it("Should find announceImageEntity by id", async () => {
    //     await sut.update(announceImageEntity)
    //     const announceImageEntityFound = await sut.findById("any_id")
    //     expect(announceImageEntityFound?.id).toBe("any_id")
    //     const { url, weight } = announceImageEntityFound!.images[0]
    //     expect(images[0]).toMatchObject({url, weight})
    // })
})