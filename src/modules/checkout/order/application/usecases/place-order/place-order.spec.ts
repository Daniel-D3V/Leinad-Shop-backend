
import { PlaceOrderInputDto } from "./place-order.dto"
import { PlaceOrderUsecase } from "./place-order.usecase"
import { mock } from "jest-mock-extended"
import { CreateOrderItemsFromDtoUsecase } from "./helpers"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { OrderRepositoryInterface } from "../../../domain/repositories"
import { OrderPlacedEvent } from "./order-placed.event"
import { OrderEntity } from "../../../domain/entities"

jest.mock("./helpers")
jest.mock("./order-placed.event")
jest.mock( "../../../domain/entities")

describe("Test PlaceOrder", () => {

    let sut: PlaceOrderUsecase
    let props: PlaceOrderInputDto
    let eventEmitter: EventEmitterInterface
    let orderRepository: OrderRepositoryInterface

    beforeEach(() => {
        
        jest.spyOn(CreateOrderItemsFromDtoUsecase.prototype, "execute").mockResolvedValue({
            isLeft: () => false,
        } as any)

        jest.spyOn(OrderEntity, "create").mockReturnValue({
            isLeft: () => false,
            value: {
                toJSON: () => ({ mock: "any_entity_to_json_mock" }),
                getTotal: () => 100,
                getTotalQuantity: () => 10
            }
        } as any)

        eventEmitter = mock<EventEmitterInterface>()
        orderRepository = mock<OrderRepositoryInterface>()

        props = {
            customerId: "any_customer_id",
            products: []
        }
        sut = new PlaceOrderUsecase(orderRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const result = await sut.execute(props)
        expect(result.isRight()).toBeTruthy()
    })

    it("Should return an error if CreateOrderItemsFromDtoUsecase returns an error ", async () => {
        const usecaseError = new Error("any_error")
        jest.spyOn(CreateOrderItemsFromDtoUsecase.prototype, "execute").mockResolvedValue({
            isLeft: () => true,
            value: [ usecaseError ]
        } as any)
        const result = await sut.execute(props)
        expect(result.value).toEqual([ usecaseError ])
    })

    it("Should an error if OrderEntity returns an error on its creation", async () => {
        const entityError = new Error("any_error")
        jest.spyOn(OrderEntity, "create").mockReturnValue({
            isLeft: () => true,
            value: [ entityError ]
        } as any)
        const output = await sut.execute(props)
        expect(output.value).toEqual([ entityError ])
    })

    it("Should call orderRepository.create once", async () => {
        await sut.execute(props)
        expect(orderRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should create OrderPlacedEvent with correct values", async () => {
        await sut.execute(props)
        expect(OrderPlacedEvent).toHaveBeenCalledWith({ 
            mock: "any_entity_to_json_mock",
            total: 100,
            totalItemsQuantity: 10
        })
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

})