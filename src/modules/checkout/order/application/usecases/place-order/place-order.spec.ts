
import { PlaceOrderInputDto } from "./place-order.dto"
import { PlaceOrderUsecase } from "./place-order.usecase"
import { mock } from "jest-mock-extended"


describe("Test PlaceOrder", () => {

    let sut: PlaceOrderUsecase
    let props: PlaceOrderInputDto

    beforeEach(() => {
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
})