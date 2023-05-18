import { mock } from "jest-mock-extended"
import { AnnounceEntity } from "../../../domain/entities"
import { PrismaAnnounceRepository } from "./prisma-announce-repository"
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"


describe("Test PrismaAnnounceRepository", () => {

    let sut: PrismaAnnounceRepository
    let announceEntity: AnnounceEntity
    let id: string

    beforeEach( async () => {
        id = "any_id"
        announceEntity = mock<AnnounceEntity>({
            toJSON: () => ({
                id,
                categoryId: "any_category_id",
                description: "any_description",
                price: 20,
                status: "DEACTIVATED",
                title: "any_title",
                userId: "any_user_id"
            })
        })
        sut = new PrismaAnnounceRepository()
        await prismaClient.announce.deleteMany()
        await prismaClient.category.deleteMany()
        await prismaClient.category.create({ data: {id: "any_category_id"}})
    })

    it("Should persist the entity on the database", async () => {
        await sut.create(announceEntity)
        const prismaAnnounce = await prismaClient.announce.findUnique({ where: { id } })
        expect(prismaAnnounce).toMatchObject(announceEntity.toJSON())
    })

    it("Should findById", async () => {
        await sut.create(announceEntity)
        const announceEntityFound = await sut.findById(id)
        expect(announceEntityFound?.toJSON()).toMatchObject(announceEntity.toJSON())
    })

    it("Should delete", async () => {
        await sut.create(announceEntity)
        await sut.delete(id)
        const announceEntityFound = await sut.findById(id)
        expect(announceEntityFound).toBe(null)
    })

    it("Should update", async () => {
        await sut.create(announceEntity)
        const updateProps = {
            id,
            description: "new_description",
            status: "ACTIVE" as AnnounceEntity.Status,
            title: "new_title",
        }
        announceEntity = mock<AnnounceEntity>({
            id,
            toJSON: () => updateProps as any
        })
        await sut.update(announceEntity)

        const announceEntityFound = await sut.findById(id)
        expect(announceEntityFound?.toJSON()).toMatchObject(updateProps)
    })
})