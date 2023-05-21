import { UserRepositoryInterface } from "@/modules/auth/domain/repositories"
import { SignupUsecase } from "./signup.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { UserEntity } from "@/modules/auth/domain/entities";
import { UserSignupEvent } from "./user-signup.event"
import { SignupUsecaseInterface } from "@/modules/auth/domain/usecases";

jest.mock("@/modules/auth/domain/entities")
jest.mock("./user-signup.event")

describe('Test signupUsecase', () => { 

    let sut: SignupUsecase
    let props: SignupUsecaseInterface.InputDto
    let userRepository: UserRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let userEntity: UserEntity

    beforeEach(() => {

        props = {
            email: "any_mail@mail.com",
            password: "any_password",
            username: "any_username"
        }

        userEntity = mock<UserEntity>({
            toJSON: () => ({ mock: "any_mock_value" })
        } as any)
        jest.spyOn(UserEntity, "create").mockReturnValue({
            isLeft: () => false,
            value: userEntity
        } as any)

        userRepository = mock<UserRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new SignupUsecase(userRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })



    it("Should return an error if userEntity returns an error on the creation", async () => {
        const entityError = new Error("EntityError")
        jest.spyOn(UserEntity, "create").mockReturnValueOnce({
            isLeft: () => true,
            value: [ entityError ]
        } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual([ entityError ])
    })

    it("Should return UsernameInUseError if userRepository finds a user with the same username", async () => {
        jest.spyOn(userRepository, "findByUsername").mockResolvedValueOnce(true as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not be right")
        expect(output.value[0].name).toBe("UsernameInUseError")
    })

    it("Should return EmailInUseError if userRepository finds a user with the same email", async () => {
        jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(true as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not be right")
        expect(output.value[0].name).toBe("EmailInUseError")
    })

    it("Should call userRepository.create once ", async () => {
        await sut.execute(props)
        expect(userRepository.findByEmail).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once ", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create UserSignupEvent with correct values ", async () => {
        await sut.execute(props)
        expect(UserSignupEvent).toHaveBeenCalledWith({ mock: "any_mock_value" })
    })
})