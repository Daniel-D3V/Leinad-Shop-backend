import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { AnnounceManagementEntity } from "../../../domain/entities"
import { PrismaAnnounceManagementRepository } from "./prisma-announce-management.repository"
import { mock } from "jest-mock-extended"


describe("Test PrismaAnnounceManagementRepository", () => {

    let sut: PrismaAnnounceManagementRepository
    let announceManagementEntity: AnnounceManagementEntity

    beforeEach(async () => {

        announceManagementEntity = mock<AnnounceManagementEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                announceType: "NORMAL",
                status: "DEACTIVATED",
                categoryId: "any_category_id",
                userId: "any_user_id",
            })
        })
        sut = new PrismaAnnounceManagementRepository(prismaClient)
        await prismaClient.announceManagement.deleteMany()
    })

    it("Should create a announce management entity", async () => {
        await sut.create(announceManagementEntity)
        const announceManagementEntityCreated = await sut.findById(announceManagementEntity.id)
        expect(announceManagementEntityCreated?.toJSON()).toEqual(announceManagementEntity.toJSON())
    })

    it("Should update a announce management entity", async () => {
        await sut.create(announceManagementEntity)
        
        announceManagementEntity?.activate()
        announceManagementEntity.changeTypeToItem()
        await sut.update(announceManagementEntity)

        const announceManagementEntityUpdated = await sut.findById(announceManagementEntity.id)
        expect(announceManagementEntityUpdated?.toJSON()).toEqual(announceManagementEntity?.toJSON())
    })

    it("Should find a announce management entity by id", async () => {
        await sut.create(announceManagementEntity)
        const announceManagementEntityCreated = await sut.findById(announceManagementEntity.id)
        expect(announceManagementEntityCreated?.toJSON()).toEqual(announceManagementEntity.toJSON())
    })

    it("Should return null if not found a announce management entity by id", async () => {
        const announceManagementEntityCreated = await sut.findById(announceManagementEntity.id)
        expect(announceManagementEntityCreated).toBeNull()
    })
})