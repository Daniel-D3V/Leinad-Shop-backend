import { UserActivityEntity } from "@/modules/user-activity/domain/entities";
import { PrismaUserActivityRepository } from "./prisma-user-activity.repository";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { mock } from "jest-mock-extended";


describe("Test PrismaUserActivityRepository", () => {

    let sut: PrismaUserActivityRepository;
    let userActivityEntity: UserActivityEntity

    beforeEach(async () => {

        userActivityEntity = mock<UserActivityEntity>({
            id: "any_id",
            userId: "any_user_id",
            toJSON: () => ({
                id: "any_id",
                userId: "any_user_id",
                status: "ONLINE",
                StatusOptions: "DEFAULT",
            })
        })
        sut = new PrismaUserActivityRepository(prismaClient)
        await prismaClient.userActivity.deleteMany()
    })

    afterAll(async () => {
        await prismaClient.$disconnect()
    })

    it("should create a user activity", async () => {
        await sut.create(userActivityEntity)
        const userActivity = await prismaClient.userActivity.findUnique({
            where: { id: userActivityEntity.id }
        })
        expect(userActivityEntity.toJSON()).toEqual({
            ...userActivity,
            lastSeen: undefined
        })
    })

    it("should find a user activity by userId", async () => {
        await sut.create(userActivityEntity)
        const userActivity = await sut.findByUserId(userActivityEntity.userId)
        expect(userActivityEntity.toJSON()).toEqual(userActivity?.toJSON())
    })

    it("Should return null if user activity not found", async () => {
        const userActivity = await sut.findByUserId(userActivityEntity.userId)
        expect(userActivity).toBeNull()
    })

    it("should update a user activity", async () => {
        await sut.create(userActivityEntity)
        const userActivity  = await sut.findByUserId(userActivityEntity.userId)
        userActivity?.setStatusOffline()
        userActivity?.setOptionIdle()
        await sut.update(userActivity!)
        const updatedUserActivity = await sut.findByUserId(userActivityEntity.userId)
        expect(userActivity?.toJSON()).toEqual({
            ...updatedUserActivity?.toJSON()
        })
    })
})