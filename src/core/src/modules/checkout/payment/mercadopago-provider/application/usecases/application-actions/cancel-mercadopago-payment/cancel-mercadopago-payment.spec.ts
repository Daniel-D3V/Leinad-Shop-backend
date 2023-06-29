import { EventEmitterInterface } from "@/modules/@shared/events"
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories"
import { CancelMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases"
import { CancelMercadopagoPaymentUsecase } from "./cancel-mercadopago-payment.usecase"
import { MercadopagoPaymentProviderEntity } from "../../../../domain/entities"
import { mock } from "jest-mock-extended"
import { MercadopagoPaymentCancelledEvent } from "./mercadopago-payment-cancelled.event"

jest.mock("./mercadopago-payment-cancelled.event")

describe('Test CancelMercadoPagoPayment', () => {

    let sut: CancelMercadopagoPaymentUsecase
    let props: CancelMercadopagoPaymentUsecaseInterface.InputDto
    let mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity

    beforeEach(() => {
        props = {
            mercadopagoPaymentProviderId: "any_mercado_pago_payment_provider_id"
        }
        mercadopagoPaymentProviderEntity = mock<MercadopagoPaymentProviderEntity>()
        mercadopagoPaymentProviderRepository = mock<MercadopagoPaymentProviderRepositoryInterface>({
            findById: jest.fn().mockResolvedValue(mercadopagoPaymentProviderEntity),
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CancelMercadopagoPaymentUsecase(mercadopagoPaymentProviderRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const ouput = await sut.execute(props)
        expect(ouput.isRight()).toBeTruthy()
    })

    it("Should return MercadopagoPaymentProviderNotFoundError if the payment provider is not found", async () => {
        jest.spyOn(mercadopagoPaymentProviderRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)

        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentProviderNotFoundError")
    })

    it("Should call cancel method from MercadopagoPaymentProviderEntity", async () => {
        await sut.execute(props)
        expect(mercadopagoPaymentProviderEntity.cancel).toBeCalledTimes(1)
    })

    it("Should call update method from MercadopagoPaymentProviderRepository", async () => {
        await sut.execute(props)
        expect(mercadopagoPaymentProviderRepository.update).toBeCalledTimes(1)
    })

    it("Should call emit method from EventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create MercadopagoPaymentCancelledEvent with correct values", async () => {
        await sut.execute(props)
        expect(MercadopagoPaymentCancelledEvent).toHaveBeenCalledWith({
            mercadopagoPaymentProviderId: mercadopagoPaymentProviderEntity.id
        })
    })
})