import { EventEmitterInterface } from "@/modules/@shared/events"
import { UserRepositoryInterface } from "../../../domain/repositories"
import { VerifyEmailUsecaseInterface } from "../../../domain/usecases"
import { VerifyEmailUsecase } from "./verify-email.usecase"
import { UserEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { AuthUserEmailVerifiedEvent } from "./auth-user-email-verified.event"

jest.mock("./auth-user-email-verified.event")

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
        userEntity = mock<UserEntity>({
            isEmailVerified: false
        })
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

    it("Should return a UserNotFoundError if user not found", async () => {
        jest.spyOn(userRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return a right value")
        expect(output.value[0].name).toBe("UserNotFoundError")
    })

    it("Should return a EmailAlreadyVerifiedError if user email is already verified", async () => {
        userEntity = mock<UserEntity>({
            isEmailVerified: true
        })
        jest.spyOn(userRepository, "findById").mockResolvedValueOnce(userEntity)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return a right value")
        expect(output.value[0].name).toBe("EmailAlreadyVerifiedError")
    })

    it("Should call userEntity.verifyEmail", async () => {
        await sut.execute(props)
        expect(userEntity.verifyEmail).toBeCalled()
    })

    it("Should call userRepository.update", async () => {
        await sut.execute(props)
        expect(userRepository.update).toBeCalled()
    })

    it("Should call eventEmitter.emit", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalled()
    })

    it("Should create AuthUserEmailVerifiedEvent with correct values", async () => {
        await sut.execute(props)
        expect(AuthUserEmailVerifiedEvent).toBeCalledWith({
            userId: userEntity.id,
        })
    })
})