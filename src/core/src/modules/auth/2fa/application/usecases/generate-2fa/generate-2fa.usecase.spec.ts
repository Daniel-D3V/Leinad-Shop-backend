import { EventEmitterInterface } from "@/modules/@shared/events"
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories"
import { Generate2faUsecaseInterface } from "../../../domain/usecases"
import { TwoFactorAuthenticationManagementInterface } from "../../protocols"
import { Generate2faUsecase } from "./generate-2fa.usecase"
import { TwoFactorAuthenticationEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { TwoFactorAuthenticationGeneratedEvent } from "./2fa-generated.event"

jest.mock("./2fa-generated.event")

describe("Test Generate2faUsecase", () => {

    let sut: Generate2faUsecase
    let props: Generate2faUsecaseInterface.InputDto
    let twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface
    let twoFactorAuthenticationManagement: TwoFactorAuthenticationManagementInterface
    let eventEmitter: EventEmitterInterface
    let twoFactorAuthenticationEntity: TwoFactorAuthenticationEntity

    beforeEach(() => {

        props = {
            userId: "any_user_id"
        }

        twoFactorAuthenticationEntity = mock<TwoFactorAuthenticationEntity>()
        jest.spyOn(TwoFactorAuthenticationEntity, "create")
        .mockReturnValue(twoFactorAuthenticationEntity)

        twoFactorAuthenticationRepository = mock<TwoFactorAuthenticationRepositoryInterface>()
        twoFactorAuthenticationManagement = mock<TwoFactorAuthenticationManagementInterface>({
            generate2fa: async () => ({qrCode: "any", secret: "any"})
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new Generate2faUsecase(
            twoFactorAuthenticationRepository,
            twoFactorAuthenticationManagement,
            eventEmitter
        )
    })

    it("Should execute the usecaes properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return UserAlreadyHasTwoFactorError if 2fa is found", async () => {
        
        jest.spyOn(twoFactorAuthenticationRepository, "findByUserId")
        .mockResolvedValueOnce(true as any)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("it should not be right")
        expect(output.value[0].name).toBe("UserAlreadyHasTwoFactorError")
    })

    it("Should call twoFactorAuthenticationRepository.create with correct values", async () => {
        await sut.execute(props)
        expect(twoFactorAuthenticationRepository.create).toHaveBeenCalledWith(twoFactorAuthenticationEntity)
        expect(twoFactorAuthenticationRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create TwoFactorAuthenticationGeneratedEvent with correct values", async () => {
        await sut.execute(props)
        expect(TwoFactorAuthenticationGeneratedEvent).toHaveBeenCalledWith({
            ...twoFactorAuthenticationEntity.toJSON()
        })
    })
})