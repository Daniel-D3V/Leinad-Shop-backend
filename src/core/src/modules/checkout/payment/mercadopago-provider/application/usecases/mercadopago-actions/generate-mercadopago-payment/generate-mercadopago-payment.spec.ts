import { OrderFacadeInterface } from "@/modules/checkout/order/facades"
import { GenerateMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/mercadopago-actions"
import { GenerateMercadopagoPaymentUsecase } from "./generate-mercadopago-payment.usecase"
import { OrderPaymentFacadeInterface } from "@/modules/checkout/payment/order-payment/facades"
import { MercadopagoGatewayInterface } from "../../../../domain/gateways"
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { MercadopagoPaymentProviderEntity } from "../../../../domain/entities"

describe('Test GenerateMercadoPagoPayment', () => {

    let sut: GenerateMercadopagoPaymentUsecase
    let props: GenerateMercadopagoPaymentUsecaseInterface.InputDto
    let orderFacade: OrderFacadeInterface
    let orderPaymentFacade: OrderPaymentFacadeInterface
    let mercadopagoGateway: MercadopagoGatewayInterface
    let mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity

    beforeEach(() => {
        props = {
            orderId: "any_order_id",
            paymentMethod: "PIX"
        }
        mercadopagoPaymentProviderEntity = mock<MercadopagoPaymentProviderEntity>()
        jest.spyOn(MercadopagoPaymentProviderEntity, "create")
        .mockReturnValue(mercadopagoPaymentProviderEntity)
        orderFacade = mock<OrderFacadeInterface>({
            consultOrderDetails: jest.fn().mockResolvedValue({ customer: {}})
        })
        orderPaymentFacade = mock<OrderPaymentFacadeInterface>()
        mercadopagoGateway = mock<MercadopagoGatewayInterface>({
            generatePayment: jest.fn().mockResolvedValue({})
        })
        mercadopagoPaymentProviderRepository = mock<MercadopagoPaymentProviderRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()

        sut = new GenerateMercadopagoPaymentUsecase(
            orderFacade,
            orderPaymentFacade,
            mercadopagoGateway,
        )
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return PaymentAlreadyCreatedError if payment already created", async () => {
        jest.spyOn(orderPaymentFacade, "hasPaymentCreated")
        .mockResolvedValue(true)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right side")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("PaymentAlreadyCreatedError")
    })

    it("Should return OrderNotFoundError if order not found", async () => {
        jest.spyOn(orderFacade, "consultOrderDetails")
        .mockResolvedValue(null)

        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right side")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("OrderNotFoundError")
    })

    it("Should call generatePayment from mercadopagoGateway  once", async () => {
        await sut.execute(props)
        expect(mercadopagoGateway.generatePayment).toBeCalledTimes(1)
    })


    
})