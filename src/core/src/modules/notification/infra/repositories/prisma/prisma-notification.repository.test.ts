import { NotificationEntity } from "@/modules/notification/domain/entities"
import { PrismaNotificationRepository } from "./prisma-notification.repository"
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { mock } from "jest-mock-extended"


describe("Test PrismaNotificationRepository", () => {

    let sut: PrismaNotificationRepository
    let notificationEntity: NotificationEntity

    beforeEach(async () => {

        notificationEntity = mock<NotificationEntity>({
            id: "any_notification_id",
            toJSON: () => ({
                id: "any_notification_id",
                content: "any_notification_content",
                dateTimeSent: new Date(),
                hasBeenSeen: true,
                topic: "any_notification_topic",
                userId: "any_user_id"
            })
        })
        sut = new PrismaNotificationRepository(prismaClient)

        await prismaClient.notification.deleteMany()
    })

    afterAll(async () => {
        await prismaClient.$disconnect()
    })


    it("Should create a notification", async () => {
        await sut.create(notificationEntity)
        const notification = await prismaClient.notification.findFirst({
            where: { id: notificationEntity.id }
        })

        expect(notification).toEqual({
            ...notificationEntity.toJSON(),
            dateTimeSent: notification?.dateTimeSent
        })
    })

    it("Should find a notification by id", async () => {
        await sut.create(notificationEntity)
        const notification = await sut.findById(notificationEntity.id)
        expect(notification?.toJSON()).toEqual({
            ...notificationEntity.toJSON(),
            dateTimeSent: notification?.dateTimeSent
        })
    })

    it("Should return null if notification is not found", async () => {
        const notification = await sut.findById(notificationEntity.id)
        expect(notification).toBeNull()
    })

    it("Should update a notification", async () => {
        await sut.create(notificationEntity)
        const notification = await sut.findById(notificationEntity.id)

        notification?.markAsRead()
        await sut.update(notification!)

        const updatedNotification = await sut.findById(notificationEntity.id)
        expect(updatedNotification?.toJSON()).toEqual({
            ...notification?.toJSON(),
            dateTimeSent: notification?.dateTimeSent
        })
    })
})