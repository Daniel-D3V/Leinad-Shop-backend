
import { PlaceOrderInputDto } from "./place-order.dto"
import { PlaceOrderUsecase } from "./place-order.usecase"
import { mock } from "jest-mock-extended"
import { CreateOrderItemsFromDtoUsecase } from "./helpers"

jest.mock("./helpers")

describe("Test PlaceOrder", () => {

    let sut: PlaceOrderUsecase
    let props: PlaceOrderInputDto

    beforeEach(() => {
        
        jest.spyOn(CreateOrderItemsFromDtoUsecase.prototype, "execute").mockResolvedValue({
            isLeft: () => false,
        } as any)

        props = {
            customerId: "any_customer_id",
            products: []
        }
        sut = new PlaceOrderUsecase()
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
})