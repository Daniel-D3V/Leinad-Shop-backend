import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { AnnounceInfoEntity } from "../../../domain/entities"
import { PrismaAnnounceInfoRepository } from "./prisma-announce-info.repository"
import { mock } from "jest-mock-extended"


describe("Test PrismaAnnounceInfoRepository", () => {

    let sut: PrismaAnnounceInfoRepository
    let announceInfoEntity: AnnounceInfoEntity


    beforeEach(async () => {

        announceInfoEntity = mock<AnnounceInfoEntity>({
            id: "any_id",
            announceId: "any_announce_id",
            toJSON: () => ({
                id: "any_id",
                title: "any_title",
                description: "any_description",
                announceId: "any_announce_id"
            })
        })

        sut = new PrismaAnnounceInfoRepository(prismaClient)
        await prismaClient.announceInfo.deleteMany()
    })

    it("Should create a announce info", async () => {
        await sut.create(announceInfoEntity)
        const createdAnnounceInfoEntity = await prismaClient.announceInfo.findUnique({
            where: { id: announceInfoEntity.id }
        })
        expect(createdAnnounceInfoEntity).toEqual(announceInfoEntity.toJSON())
    })

    it("Should find a announce info by announce id", async () => {
        await sut.create(announceInfoEntity)

        const announceInfoEntityFound = await sut.findByAnnounceId(announceInfoEntity.announceId)

        expect(announceInfoEntityFound?.toJSON()).toEqual(announceInfoEntity.toJSON())
    })

    it("Should return null if not found a announce info by announce id", async () => {
        const announceInfoEntityFound = await sut.findByAnnounceId(announceInfoEntity.announceId)
        expect(announceInfoEntityFound).toBeNull()
    })

    it("Should find a announce info  id", async () => {
        await sut.create(announceInfoEntity)

        const announceInfoEntityFound = await sut.findById(announceInfoEntity.id)
        expect(announceInfoEntityFound?.toJSON()).toEqual(announceInfoEntity.toJSON())
    })

    it("Should update", async () => {
        await sut.create(announceInfoEntity)

        announceInfoEntity.changeDescription("any_description_updated")
        announceInfoEntity.changeTitle("any_title_updated")

        await sut.update(announceInfoEntity)
        const announceInfoEntityUpdated = await sut.findById(announceInfoEntity.id)
        
        expect(announceInfoEntityUpdated?.toJSON()).toEqual(announceInfoEntity.toJSON())
    })
})