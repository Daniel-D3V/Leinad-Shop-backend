import { mock } from "jest-mock-extended"
import { AnnounceImageEntity } from "../../../domain/entities"
import { PrismaAnnounceImagesRepository } from "./prisma-announce-images.repository"
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"


describe("Test PrismaAnnounceImagesRepository", () => {

    let sut: PrismaAnnounceImagesRepository
    let announceImageEntity: AnnounceImageEntity

    beforeEach(async () => {
        announceImageEntity = mock<AnnounceImageEntity>()
        sut = new PrismaAnnounceImagesRepository()
        await prismaClient.announceImages.deleteMany()
    })

    it("Should update the announceImageEntity", async () => {

    })
})