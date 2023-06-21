import { SetIdleStatusOptionUsecaseInterface } from "@/modules/user-activity/domain/usecases"
import { SetIdleStatusOptionUsecase } from "./set-idle-status-option.usecase"
import { UserActivityRepositoryInterface } from "@/modules/user-activity/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { UserActivityEntity } from "@/modules/user-activity/domain/entities"
import { mock } from "jest-mock-extended"
import { StatusOptionSetIdleEvent } from "./status-option-set-idle.event"

jest.mock("./status-option-set-idle.event")

describe("Test SetIdleStatusOptionUsecase", () => {

    let sut: SetIdleStatusOptionUsecase
    let props: SetIdleStatusOptionUsecaseInterface.InputDto
    let userActivityRepository: UserActivityRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let userActivityEntity: UserActivityEntity

    beforeEach(() => {
        props = {
            userId: "any_user_id"
        }
        userActivityEntity = mock<UserActivityEntity>()
        userActivityRepository = mock<UserActivityRepositoryInterface>({
            findByUserId: jest.fn().mockResolvedValue(userActivityEntity),
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new SetIdleStatusOptionUsecase(userActivityRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return UserActivityNotFoundError if user activity not found", async () => {
        jest.spyOn(userActivityRepository, "findByUserId").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("UserActivityNotFoundError")
    })

    it("Should return OptionIsAlreadySetIdleError if option is already set to idle", async () => {
        jest.spyOn(userActivityEntity, "isOptionIdle").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("OptionIsAlreadySetIdleError")
    })

    it("Should userActivityEntity.setOptionIdle once", async () => {
        await sut.execute(props)
        expect(userActivityEntity.setOptionIdle).toHaveBeenCalledTimes(1)
    })

    it("Should userActivityRepository.update once", async () => {
        await sut.execute(props)
        expect(userActivityRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StatusOptionSetIdleEvent with correct values", async () => {
        await sut.execute(props)
        expect(StatusOptionSetIdleEvent).toHaveBeenCalledWith({
            userActivityId: userActivityEntity.id
        })
    })
})