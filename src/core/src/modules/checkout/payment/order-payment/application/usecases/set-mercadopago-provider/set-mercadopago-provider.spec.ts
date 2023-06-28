import { EventEmitterInterface } from "@/modules/@shared/events"
import { OrderPaymentRepositoryInterface } from "../../../domain/repositories"
import { SetMercadopagoProviderUsecaseInterface } from "../../../domain/usecases"
import { SetMercadopagoProviderUsecase } from "./set-mercadopago-provider.usecase"
import { OrderPaymentEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { OrderPaymentMercadopagoProviderSetEvent } from "./events"

jest.mock("./events")

describe("Test SetMercadoPagoProvider", () => {

    let sut: SetMercadopagoProviderUsecase
    let props: SetMercadopagoProviderUsecaseInterface.InputDto
    let orderPaymentRepository: OrderPaymentRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let orderPaymentEntity: OrderPaymentEntity

    beforeEach(() => {
        props = {
            orderPaymentId: "any_order_payment_id",
            mercadopagoProviderId: "any_mercadopago_provider_id"
        }

        orderPaymentEntity = mock<OrderPaymentEntity>()
        orderPaymentRepository = mock<OrderPaymentRepositoryInterface>({
            findById: async () => orderPaymentEntity
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new SetMercadopagoProviderUsecase(orderPaymentRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return an OrderPaymentNotFoundError if the order payment does not exist", async () => {
        jest.spyOn(orderPaymentRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return a right value")
        expect(output.isLeft()).toBe(true)
        expect(output.value[0].name).toBe("OrderPaymentNotFoundError")
    })

    it("Should return an OrderPaymentAlreadyHasAProviderError if the order payment already has a provider", async () => {
        jest.spyOn(orderPaymentEntity, "hasPaymentProvider").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return a right value")
        expect(output.isLeft()).toBe(true)
        expect(output.value[0].name).toBe("OrderPaymentAlreadyHasAProviderError")
    })



    it("Should call setMercadopagoPaymentProvider from orderPaymentEntity once", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
        expect(orderPaymentEntity.setMercadopagoPaymentProvider).toHaveBeenCalledTimes(1)
    })

    it("Should call update from orderPaymentRepository once", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
        expect(orderPaymentRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call emit from eventEmitter once", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create OrderPaymentMercadopagoProviderSetEvent with correct values", async () => {
        await sut.execute(props)
        expect(OrderPaymentMercadopagoProviderSetEvent).toHaveBeenCalledWith({
            orderPaymentId: orderPaymentEntity.id,
            mercadopagoProviderId: orderPaymentEntity.paymentProviderId
        })
    })
})