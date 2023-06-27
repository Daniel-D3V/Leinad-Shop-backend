import { EventEmitterInterface } from "@/modules/@shared/events"
import { OrderPaymentRepositoryInterface } from "../../../domain/repositories"
import { SetMercadopagoProviderUsecaseInterface } from "../../../domain/usecases"
import { SetMercadopagoProviderUsecase } from "./set-mercadopago-provider.usecase"
import { OrderPaymentEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"


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

})