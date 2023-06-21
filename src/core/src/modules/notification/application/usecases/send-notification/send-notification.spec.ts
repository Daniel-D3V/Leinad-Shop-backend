import { SendNotificationUsecaseInterface } from "@/modules/notification/domain/usecases"
import { SendNotificationUsecase } from "./send-notification.usecase"
import { NotificationRepositoryInterface } from "@/modules/notification/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { NotificationEntity } from "@/modules/notification/domain/entities"
import { NotificationSentEvent } from "./notification-sent.event"

jest.mock("./notification-sent.event")

describe("Test SendNotificationUseCase", () => {

    let sut: SendNotificationUsecase
    let props: SendNotificationUsecaseInterface.InputDto
    let notificationRepository: NotificationRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let notificationEntity: NotificationEntity

    beforeEach(() => {
        notificationEntity = mock<NotificationEntity>()
        jest.spyOn(NotificationEntity, "create").mockReturnValue(notificationEntity)
        props = {
            content: "any_content",
            topic: "any_topic",
            userId: "any_user_id",
        }
        notificationRepository = mock<NotificationRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new SendNotificationUsecase(notificationRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should call notificationRepository.create with correct params", async () => {
        await sut.execute(props)
        expect(notificationRepository.create).toHaveBeenCalledWith(notificationEntity)
        expect(notificationRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create NotificationSentEvent with correct params", async () => {
        await sut.execute(props)
        expect(NotificationSentEvent).toHaveBeenCalledWith({
            ...notificationEntity.toJSON()
        })
    })
})