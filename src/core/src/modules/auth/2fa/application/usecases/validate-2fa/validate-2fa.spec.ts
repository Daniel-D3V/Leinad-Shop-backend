import { EventEmitterInterface } from "@/modules/@shared/events"
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories"
import { Validate2faUsecaseInterface } from "../../../domain/usecases"
import { TwoFactorAuthenticationManagementInterface } from "../../protocols"
import { Validate2faUsecase } from "./validate-2fa.usecase"
import { TwoFactorAuthenticationEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { TwoFactorAuthenticationValidatedEvent } from "./2fa-validated.event"

jest.mock("./2fa-validated.event")

describe("Test Validate2faUsecase", () => {

    let sut: Validate2faUsecase
    let props: Validate2faUsecaseInterface.InputDto
    let twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface
    let twoFactorAuthenticationManagement: TwoFactorAuthenticationManagementInterface
    let eventEmitter: EventEmitterInterface
    let twoFactorAuthenticationEntity: TwoFactorAuthenticationEntity

    beforeEach(() => {

        props = { 
            userId: "any_user_id",
            token: "any_token"
        }
        
        twoFactorAuthenticationEntity = mock<TwoFactorAuthenticationEntity>()

        twoFactorAuthenticationRepository = mock<TwoFactorAuthenticationRepositoryInterface>({
            findByUserId: async () => twoFactorAuthenticationEntity
        })
        twoFactorAuthenticationManagement = mock<TwoFactorAuthenticationManagementInterface>({
            verify2fa: async () => true
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new Validate2faUsecase(
            twoFactorAuthenticationRepository,
            twoFactorAuthenticationManagement,
            eventEmitter
        )
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return TwoFactorNotFoundError if twoFactor is not found on repository", async () => {
        jest.spyOn(twoFactorAuthenticationRepository, "findByUserId")
        .mockResolvedValueOnce(null)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("it should not be right")
        expect(output.value[0].name).toBe("TwoFactorNotFoundError")
    })

    it("Should return TwoFactorIsAlreadyValidError if twoFactorEntity is already valid", async () => {
        jest.spyOn(twoFactorAuthenticationEntity, "isValid")
        .mockReturnValueOnce(true)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("it should not be right")
        expect(output.value[0].name).toBe("TwoFactorIsAlreadyValidError")
    })

    it("Should return Invalid2faTokenError if twoFactorAuthenticationManagement.verify2fa returns false", async () => {
        jest.spyOn(twoFactorAuthenticationManagement, "verify2fa")
        .mockResolvedValueOnce(false)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("it should not be right")
        expect(output.value[0].name).toBe("Invalid2faTokenError")
    })

    it("Should call twoFactorAuthenticationEntity.validate once", async () => {
        await sut.execute(props)
        expect(twoFactorAuthenticationEntity.validate).toHaveBeenCalledTimes(1)
    })

    it("Should call twoFactorAuthenticationRepository.update once", async () => {
        await sut.execute(props)
        expect(twoFactorAuthenticationRepository.update).toHaveBeenCalledWith(twoFactorAuthenticationEntity)
        expect(twoFactorAuthenticationRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create TwoFactorAuthenticationValidatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(TwoFactorAuthenticationValidatedEvent).toHaveBeenCalledWith({
            twoFactorAuthenticationId: twoFactorAuthenticationEntity.id
        })
    })
})