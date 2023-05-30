import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaAnnounceItemRepository } from "./prisma-announce-item.repository";
import { AnnounceItemEntity } from "../../../domain/entities";
import { mock } from "jest-mock-extended";


describe("Test PrismaAnnounceItemRepository", () => {

    let sut: PrismaAnnounceItemRepository;
    let announceItemEntity: AnnounceItemEntity

    beforeEach(async () => {

        announceItemEntity = mock<AnnounceItemEntity>({
            id: "any_id",
            toJSON: () => ({
                id: "any_id",
                title: "any_title",
                price: 10,
                announceId: "any_announce_id",
            })
        })
        sut = new PrismaAnnounceItemRepository(prismaClient);
        await prismaClient.announceItem.deleteMany();
    })

    afterAll(async () => {
        prismaClient.$disconnect();
    })

    it("Should create a new announce item", async () => {
        await sut.create(announceItemEntity);
        const result = await prismaClient.announceItem.findUnique({
            where: { id: announceItemEntity.id }
        })
        expect(result).toBeTruthy();
        expect(result).toEqual(announceItemEntity.toJSON())
    })

    it("Should find a announce item by id", async () => {
        await sut.create(announceItemEntity);
        const result = await sut.findById(announceItemEntity.id);
        expect(announceItemEntity.toJSON()).toEqual(result?.toJSON())
    })

    it("Should return null if not found a announce item by id", async () => {
        const result = await sut.findById(announceItemEntity.id);
        expect(result).toBeNull();
    })

    it("Should update a announce item", async () => {
        await sut.create(announceItemEntity);
        const result = await sut.findById(announceItemEntity.id);
        announceItemEntity.changePrice(10)
        announceItemEntity.changeTitle("new_title")
        await sut.update(announceItemEntity);
        const resultUpdated = await sut.findById(announceItemEntity.id);
        expect(announceItemEntity.toJSON()).toEqual(resultUpdated?.toJSON())
    })
})