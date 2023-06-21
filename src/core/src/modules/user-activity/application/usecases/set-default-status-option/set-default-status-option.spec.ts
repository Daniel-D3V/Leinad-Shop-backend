import { SetDefaultStatusOptionUsecaseInterface } from "@/modules/user-activity/domain/usecases"
import { UserActivityRepositoryInterface } from "@/modules/user-activity/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { UserActivityEntity } from "@/modules/user-activity/domain/entities"
import { mock } from "jest-mock-extended"
import { SetDefaultStatusOptionUsecase } from "./set-default-status-option.usecase"
import { StatusOptionSetDefaultEvent } from "./status-option-set-default.event"


jest.mock("./status-option-set-default.event")

describe("Test SetIdleStatusOptionUsecase", () => {

    let sut: SetDefaultStatusOptionUsecase
    let props: SetDefaultStatusOptionUsecaseInterface.InputDto
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
        sut = new SetDefaultStatusOptionUsecase(userActivityRepository, eventEmitter)
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

    it("Should return OptionIsAlreadySetDefaultError if option is already set to default", async () => {
        jest.spyOn(userActivityEntity, "isOptionDefault").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("OptionIsAlreadySetDefaultError")
    })

    it("Should userActivityEntity.setOptionDefault once", async () => {
        await sut.execute(props)
        expect(userActivityEntity.setOptionDefault).toHaveBeenCalledTimes(1)
    })

    it("Should userActivityRepository.update once", async () => {
        await sut.execute(props)
        expect(userActivityRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create StatusOptionSetDefaultEvent with correct values", async () => {
        await sut.execute(props)
        expect(StatusOptionSetDefaultEvent).toHaveBeenCalledWith({
            userActivityId: userActivityEntity.id
        })
    })
})