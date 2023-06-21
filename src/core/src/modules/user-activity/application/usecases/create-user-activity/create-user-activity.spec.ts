import { EventEmitterInterface } from "@/modules/@shared/events"
import { UserActivityRepositoryInterface } from "../../../domain/repositories"
import { CreateUserActivityUsecaseInterface } from "../../../domain/usecases"
import { CreateUserActivityUsecase } from "./create-user-activity.usecase"
import { UserActivityEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { UserActivityCreatedEvent } from "./user-activity-created.event"

jest.mock("./user-activity-created.event")

describe("Test CreateUserActivityUsecase", () => {

    let sut: CreateUserActivityUsecase
    let props: CreateUserActivityUsecaseInterface.InputDto
    let userActivityRepository: UserActivityRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let userActivityEntity: UserActivityEntity
    
    beforeEach(() => {
        props = {
            userId: "any_user_id"
        }
        userActivityEntity = mock<UserActivityEntity>()
        jest.spyOn(UserActivityEntity, "create").mockReturnValue(userActivityEntity)
        userActivityRepository = mock<UserActivityRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateUserActivityUsecase(userActivityRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should call userActivityRepository.create with the right params", async () => {
        await sut.execute(props)
        expect(userActivityRepository.create).toHaveBeenCalledWith(userActivityEntity)
        expect(userActivityRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create UserActivityCreatedEvent with correct params", async () => {
        await sut.execute(props)
        expect(UserActivityCreatedEvent).toHaveBeenCalledWith({
            ...userActivityEntity.toJSON()
        })
    })
})