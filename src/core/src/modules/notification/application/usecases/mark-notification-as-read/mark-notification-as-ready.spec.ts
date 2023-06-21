import { MarkNotificationAsReadUsecaseInterface } from "@/modules/notification/domain/usecases"
import { MarkNotificationAsReadUsecase } from "./mark-notification-as-read.usecase"
import { NotificationRepositoryInterface } from "@/modules/notification/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { NotificationEntity } from "@/modules/notification/domain/entities"
import { mock } from "jest-mock-extended"
import { NotificationMarkedAsReadEvent } from "./notification-marked-as-read.event"

jest.mock("./notification-marked-as-read.event")

describe("Test MarkNotificationAsRead", () => {

    let sut: MarkNotificationAsReadUsecase
    let props: MarkNotificationAsReadUsecaseInterface.InputDto
    let notificationRepository: NotificationRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let notificationEntity: NotificationEntity

    beforeEach(() => {

        props = {
            notificationId: "any_notification_id"
        }
        notificationEntity = mock<NotificationEntity>()
        notificationRepository = mock<NotificationRepositoryInterface>({
            findById: jest.fn().mockResolvedValue(notificationEntity)
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new MarkNotificationAsReadUsecase(notificationRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return a NotificationNotFoundError if the notification does not exist", async () => {
        jest.spyOn(notificationRepository, "findById")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return a right value")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("NotificationNotFoundError")
    })

    it("Should call the markAsRead method of the notification entity", async () => {
        await sut.execute(props)
        expect(notificationEntity.markAsRead).toHaveBeenCalledTimes(1)
    })

    it("Should call the update method of the notification repository", async () => {
        await sut.execute(props)
        expect(notificationRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call the emit method of the event emitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create NotificationMarkedAsReadEvent with correct values", async () => {
        await sut.execute(props)
        expect(NotificationMarkedAsReadEvent).toHaveBeenCalledWith({
            notificationId: notificationEntity.id
        })
    })
})