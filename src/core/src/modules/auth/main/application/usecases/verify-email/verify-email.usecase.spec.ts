import { EventEmitterInterface } from "@/modules/@shared/events"
import { UserRepositoryInterface } from "../../../domain/repositories"
import { VerifyEmailUsecaseInterface } from "../../../domain/usecases"
import { VerifyEmailUsecase } from "./verify-email.usecase"
import { UserEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"


describe("Test VerifyEmailUseCase", () => {

    let sut: VerifyEmailUsecase
    let props: VerifyEmailUsecaseInterface.InputDto
    let userRepository: UserRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let userEntity: UserEntity

    beforeEach(() => {

        props = {
            userId: "any_user_id"
        }
        userEntity = mock<UserEntity>()
        userRepository = mock<UserRepositoryInterface>({
            findById: jest.fn().mockResolvedValue(userEntity),
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new VerifyEmailUsecase(userRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })
})