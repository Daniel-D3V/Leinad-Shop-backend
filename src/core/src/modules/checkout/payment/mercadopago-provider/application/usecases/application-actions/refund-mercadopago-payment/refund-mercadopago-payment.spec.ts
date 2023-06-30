import { EventEmitterInterface } from "@/modules/@shared/events"
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories"
import {  RefundMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/application-actions"
import { MercadopagoPaymentProviderEntity } from "../../../../domain/entities"
import { mock } from "jest-mock-extended"
import { MercadopagoGatewayInterface } from "../../../../domain/gateways"
import { RefundMercadopagoPaymentUsecase } from "./refund-mercadopago-payment.usecase"
import { MercadopagoPaymentRefundedEvent } from "./mercadopago-payment-approved.event"

jest.mock("./mercadopago-payment-approved.event")

describe('Test CancelMercadoPagoPayment', () => {

    let sut: RefundMercadopagoPaymentUsecase
    let props: RefundMercadopagoPaymentUsecaseInterface.InputDto
    let mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity
    let mercadopagoGateway: MercadopagoGatewayInterface

    beforeEach(() => {
        props = {
            mercadopagoPaymentId: "any_mercaodpago_payment_id"
        }
        mercadopagoPaymentProviderEntity = mock<MercadopagoPaymentProviderEntity>()
        mercadopagoGateway = mock<MercadopagoGatewayInterface>({
            findById: jest.fn().mockResolvedValue({ status: "REFUNDED" })
        })
        mercadopagoPaymentProviderRepository = mock<MercadopagoPaymentProviderRepositoryInterface>({
            findByMercadopagoPaymentId: jest.fn().mockResolvedValue(mercadopagoPaymentProviderEntity),
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new RefundMercadopagoPaymentUsecase(
            mercadopagoPaymentProviderRepository, 
            mercadopagoGateway, 
            eventEmitter
        )
    })

    it("Should execute the usecase properly", async () => {
        const ouput = await sut.execute(props)
        expect(ouput.isRight()).toBeTruthy()
    })

    it("Should return MercadopagoPaymentNotFoundError if the payment is not found", async () => {
        jest.spyOn(mercadopagoGateway, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)

        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentNotFoundError")
    })

    it("Should return MercadopagoPaymentProviderNotFoundError if the payment provider is not found", async () => {
        jest.spyOn(mercadopagoPaymentProviderRepository, "findByMercadopagoPaymentId").mockResolvedValueOnce(null)
        const output = await sut.execute(props)

        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentProviderNotFoundError")
    })

    it("Should return MercadopagoPaymentStatusNotRefundedError if the payment status is not cancelled", async () => {
        jest.spyOn(mercadopagoGateway, "findById").mockResolvedValueOnce({ status: "any_status" } as any)
        const output = await sut.execute(props)

        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentStatusNotRefundedError")
    })

    it("Should return MercadopagoPaymentProviderIsAlreadyRefundedError if the payment provider is already cancelled", async () => {
        jest.spyOn(mercadopagoPaymentProviderEntity, "isRefunded").mockReturnValueOnce(true)
        const output = await sut.execute(props)

        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentProviderIsAlreadyRefundedError")
    })

    it("Should call refund method from MercadopagoPaymentProviderEntity", async () => {
        await sut.execute(props)
        expect(mercadopagoPaymentProviderEntity.refund).toBeCalledTimes(1)
    })

    it("Should call update method from MercadopagoPaymentProviderRepository", async () => {
        await sut.execute(props)
        expect(mercadopagoPaymentProviderRepository.update).toBeCalledTimes(1)
    })

    it("Should call emit method from EventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create MercadopagoPaymentRefundedEvent with correct values", async () => {
        await sut.execute(props)
        expect(MercadopagoPaymentRefundedEvent).toHaveBeenCalledWith({
            mercadopagoPaymentProviderId: mercadopagoPaymentProviderEntity.id
        })
    })
})