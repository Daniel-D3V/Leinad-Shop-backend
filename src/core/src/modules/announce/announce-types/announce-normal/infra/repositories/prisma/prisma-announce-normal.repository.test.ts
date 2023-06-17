import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { AnnounceNormalEntity } from "../../../domain/entities"
import { PrismaAnnounceNormalRepository } from "./prisma-announce-normal.repository"
import { mock } from "jest-mock-extended"


describe("Test PrismaAnnounceNormalRepository", () => {

    let sut: PrismaAnnounceNormalRepository
    let announceNormalEntity: AnnounceNormalEntity

    beforeEach(async () => {

        announceNormalEntity = mock<AnnounceNormalEntity>({
            id: "any_id",
            announceId: "any_announce_id",
            toJSON: () => ({
                id: "any_id",
                price: 10,
                announceId: "any_announce_id"
            })
        })
        sut = new PrismaAnnounceNormalRepository(prismaClient)
        await prismaClient.announceNormal.deleteMany()
    })

    afterAll(async () => {
        await prismaClient.$disconnect()
    })

    it("Should create announce normal", async () => {
        await sut.create(announceNormalEntity)
        const announceNormalFound = await prismaClient.announceNormal.findUnique({
            where: { id: announceNormalEntity.id  }  
        })

        expect(announceNormalFound).toEqual(announceNormalEntity.toJSON())
    })

    it("Should find announce normal by id", async () => {
        await sut.create(announceNormalEntity)
        const announceNormalFound = await sut.findById(announceNormalEntity.id)

        expect(announceNormalFound?.toJSON()).toEqual(announceNormalEntity.toJSON())
    })

    it("Should return null if announce normal not found by id", async () => {
        const announceNormalFound = await sut.findById(announceNormalEntity.id)
        expect(announceNormalFound).toBeNull()
    })

    it("Should find announce normal by announce id", async () => {
        await sut.create(announceNormalEntity)
        const announceNormalFound = await sut.findByAnnounceId(announceNormalEntity.announceId)

        expect(announceNormalFound?.toJSON()).toEqual(announceNormalEntity.toJSON())
    })

    it("Should return null if announce normal not found by announce id", async () => {
        const announceNormalFound = await sut.findByAnnounceId(announceNormalEntity.announceId)
        expect(announceNormalFound).toBeNull()
    })
})