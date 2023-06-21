import { NotificationEntity } from "@/modules/notification/domain/entities"
import { PrismaNotificationRepository } from "./prisma-notification.repository"
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { mock } from "jest-mock-extended"


describe("Test PrismaNotificationRepository", () => {

    let sut: PrismaNotificationRepository
    let notificationEntity: NotificationEntity

    beforeEach(async () => {

        notificationEntity = mock<NotificationEntity>({
            toJSON: () => ({
                id: "any_notification_id",
                content: "any_notification_content",
                dateTimeSent: new Date(),
                hasBeenSeen: false,
                topic: "any_notification_topic",
                userId: "any_user_id"
            })
        })
        sut = new PrismaNotificationRepository(prismaClient)
    })

    afterEach(async () => {
        await prismaClient.$disconnect()
    })
})