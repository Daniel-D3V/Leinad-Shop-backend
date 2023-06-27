import { EventEmitterInterface } from "@/modules/@shared/events"
import { OrderPaymentCustomerRepositoryInterface, OrderPaymentRepositoryInterface } from "../../../domain/repositories"
import { CreateOrderPaymentUsecaseInterface } from "../../../domain/usecases/create-order-payment.usecase.interface"
import { CreateOrderPaymentUsecase } from "./create-order-payment.usecase"
import { OrderPaymentCustomerEntity, OrderPaymentEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"
import { OrderPaymentCreatedEvent } from "./order-payment-created.event"

jest.mock("./order-payment-created.event")

describe("CreateOrderPayment", () => {

    let sut: CreateOrderPaymentUsecase
    let props: CreateOrderPaymentUsecaseInterface.InputDto
    let orderPaymentRepository: OrderPaymentRepositoryInterface
    let orderPaymentCustomerRepository: OrderPaymentCustomerRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let orderPaymentEntity: OrderPaymentEntity
    let orderPaymentCustomer: OrderPaymentCustomerEntity

    beforeEach(() => {

        props = {
            orderId: "any_order_id",
            userId: "any_user_id"
        }
        orderPaymentEntity = mock<OrderPaymentEntity>()
        jest.spyOn(OrderPaymentEntity, "create")
        .mockReturnValue({ isLeft: () => false, value: orderPaymentEntity } as any)
        orderPaymentRepository = mock<OrderPaymentRepositoryInterface>()

        orderPaymentCustomer = mock<OrderPaymentCustomerEntity>()
        orderPaymentCustomerRepository = mock<OrderPaymentCustomerRepositoryInterface>({
            findById: jest.fn().mockResolvedValue(orderPaymentCustomer)
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateOrderPaymentUsecase(
            orderPaymentRepository, 
            orderPaymentCustomerRepository, 
            eventEmitter
        )
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return OrderPaymentCustomerNotFoundError if orderPaymentCustomer is not found", async () => {
        jest.spyOn(orderPaymentCustomerRepository, "findById")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("OrderPaymentCustomerNotFoundError")
    })

    it("Should return left if OrderPaymentEntity.create returns left", async () => {
        jest.spyOn(OrderPaymentEntity, "create")
        .mockReturnValueOnce({ isLeft: () => true, value: [ new Error("any_error") ] } as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].message).toBe("any_error")
    })

    it("Should call orderPaymentRepository.create with correct params", async () => {
        await sut.execute(props)
        expect(orderPaymentRepository.create).toBeCalledWith(orderPaymentEntity)
        expect(orderPaymentRepository.create).toBeCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create OrderPaymentCreatedEvent with correct params", async () => {
        await sut.execute(props)
        expect(OrderPaymentCreatedEvent).toHaveBeenCalledWith({
            ...orderPaymentEntity.toJSON()
        })
    })
})