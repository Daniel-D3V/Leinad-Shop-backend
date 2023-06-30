import { EventEmitterInterface } from "@/modules/@shared/events"
import { MercadopagoGatewayInterface } from "../../../../domain/gateways"
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories"
import { ApproveMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/application-actions"
import { ApproveMercadopagoPaymentUsecase } from "./approve-mercadopago-payment.usecase"
import { MercadopagoPaymentProviderEntity } from "../../../../domain/entities"
import { mock } from "jest-mock-extended"
import { MercadopagoPaymentApprovedEvent } from "./mercadopago-payment-approved.event"
import { OrderPaymentFacadeInterface } from "@/modules/checkout/payment/order-payment/facades"

jest.mock("./mercadopago-payment-approved.event")

describe("Test ApproveMercadopagoPaymentUsecase", () => {

    let sut: ApproveMercadopagoPaymentUsecase
    let props: ApproveMercadopagoPaymentUsecaseInterface.InputDto
    let mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface
    let mercadopagoGateway: MercadopagoGatewayInterface
    let eventEmitter: EventEmitterInterface
    let mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity
    let orderPaymentFacade: OrderPaymentFacadeInterface

    beforeEach(() => {

        props = {
            mercadopagoPaymentId: "any_mercadopago_payment_id"
        }
        mercadopagoPaymentProviderEntity = mock<MercadopagoPaymentProviderEntity>()

        mercadopagoPaymentProviderRepository = mock<MercadopagoPaymentProviderRepositoryInterface>({
            findByMercadopagoPaymentId: jest.fn().mockResolvedValue(mercadopagoPaymentProviderEntity),
        })
        mercadopagoGateway = mock<MercadopagoGatewayInterface>({
            findById: jest.fn().mockResolvedValue({ status: "APPROVED" }),
            refund: jest.fn().mockResolvedValue(true)
        })
        eventEmitter = mock<EventEmitterInterface>()
        orderPaymentFacade = mock<OrderPaymentFacadeInterface>({
            getOrderPaymentDetailsById: jest.fn().mockResolvedValue({ orderPaymentProviderId: mercadopagoPaymentProviderEntity.id })
        })
        sut = new ApproveMercadopagoPaymentUsecase(
            mercadopagoPaymentProviderRepository,
            mercadopagoGateway,
            orderPaymentFacade,
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

    it("Should return OrderPaymentNotFoundError if orderPaymentFacade.getOrderPaymentDetailsById returns null", async () => {
        jest.spyOn(orderPaymentFacade, "getOrderPaymentDetailsById")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("OrderPaymentNotFoundError")
    })

    it("Should call mercadopagoGateway.refund once if orderPayment.orderPaymentId is different than mercadopagoPaymentProvider.orderPaymentId", async () => {
        jest.spyOn(orderPaymentFacade, "getOrderPaymentDetailsById")
        .mockResolvedValueOnce({ orderPaymentProviderId: "any_order_payment_id" } as any)

        await sut.execute(props)
        expect(mercadopagoGateway.refund).toHaveBeenCalledTimes(1)
    })

    it("Should return RefundError if mercadopagoGateway.refund returns false", async () => {
        jest.spyOn(orderPaymentFacade, "getOrderPaymentDetailsById")
        .mockResolvedValueOnce({ orderPaymentProviderId: "any_order_payment_id" } as any)

        jest.spyOn(mercadopagoGateway, "refund")
        .mockResolvedValueOnce(false)

        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("RefundError")
    })

    it("Should return PaymentIsNotInUseError if orderPayment.orderPaymentId is different than mercadopagoPaymentProvider.orderPaymentId", async () => {
        jest.spyOn(orderPaymentFacade, "getOrderPaymentDetailsById")
        .mockResolvedValueOnce({ orderPaymentId: "any_order_payment_id" } as any)

        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("PaymentIsNotInUseError")
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