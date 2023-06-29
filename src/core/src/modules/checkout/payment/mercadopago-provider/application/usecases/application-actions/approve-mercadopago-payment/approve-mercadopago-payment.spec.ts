import { EventEmitterInterface } from "@/modules/@shared/events"
import { MercadopagoGatewayInterface } from "../../../../domain/gateways"
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories"
import { ApproveMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/application-actions"
import { ApproveMercadopagoPaymentUsecase } from "./approve-mercadopago-payment.usecase"
import { MercadopagoPaymentProviderEntity } from "../../../../domain/entities"
import { mock } from "jest-mock-extended"
import { MercadopagoPaymentApprovedEvent } from "./mercadopago-payment-approved.event"

jest.mock("./mercadopago-payment-approved.event")

describe("Test ApproveMercadopagoPaymentUsecase", () => {

    let sut: ApproveMercadopagoPaymentUsecase
    let props: ApproveMercadopagoPaymentUsecaseInterface.InputDto
    let mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface
    let mercadopagoGateway: MercadopagoGatewayInterface
    let eventEmitter: EventEmitterInterface
    let mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity

    beforeEach(() => {

        props = {
            mercadopagoPaymentId: "any_mercadopago_payment_id"
        }
        mercadopagoPaymentProviderEntity = mock<MercadopagoPaymentProviderEntity>()

        mercadopagoPaymentProviderRepository = mock<MercadopagoPaymentProviderRepositoryInterface>({
            findByMercadopagoPaymentId: jest.fn().mockResolvedValue(mercadopagoPaymentProviderEntity),
        })
        mercadopagoGateway = mock<MercadopagoGatewayInterface>({
            findById: jest.fn().mockResolvedValue({ status: "APPROVED" })
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ApproveMercadopagoPaymentUsecase(
            mercadopagoPaymentProviderRepository,
            mercadopagoGateway,
            eventEmitter
        )
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return MercadopagoPaymentNotFoundError if mercadopagoGateway.findById returns null", async () => {
        jest.spyOn(mercadopagoGateway, "findById")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentNotFoundError")
    })

    it("Should return MercadopagoPaymentStatusNotApprovedError if mercadopagoGateway.findById returns a payment with status different than PENDING", async () => {
        jest.spyOn(mercadopagoGateway, "findById")
        .mockResolvedValueOnce({ status: "any_status" } as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentStatusNotApprovedError")
    })

    it("Should return MercadopagoPaymentProviderNotFoundError if mercadopagoPaymentProviderRepository.findByMercadopagoPaymentId returns null", async () => {
        jest.spyOn(mercadopagoPaymentProviderRepository, "findByMercadopagoPaymentId")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentProviderNotFoundError")
    })

    it("Should return MercadopagoPaymentProviderIsAlreadyApprovedError if mercadopagoPaymentProvider.isApproved returns true", async () => {
        jest.spyOn(mercadopagoPaymentProviderEntity, "isApproved")
        .mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentProviderIsAlreadyApprovedError")
    })

    it("Should call mercadopagoPaymentProvider.approve once", async () => {
        await sut.execute(props)
        expect(mercadopagoPaymentProviderEntity.approve).toHaveBeenCalledTimes(1)
    })

    it("Should call mercadopagoPaymentProviderRepository.update once", async () => {
        await sut.execute(props)
        expect(mercadopagoPaymentProviderRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create MercadopagoPaymentApprovedEvent with the correct props", async () => {
        await sut.execute(props)
        expect(MercadopagoPaymentApprovedEvent).toHaveBeenCalledWith({
            mercadopagoPaymentProviderId: mercadopagoPaymentProviderEntity.id
        })
    })  
})