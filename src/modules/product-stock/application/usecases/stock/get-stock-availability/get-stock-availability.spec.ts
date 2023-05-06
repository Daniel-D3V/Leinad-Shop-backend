import { GetStokAvailabilityInputDto } from "./get-stock-availability.dto"
import { GetStockAvailabilityUsecase } from "./get-stock-availability.usecase"


describe("Test GetStockAvailabilityUsecase", () => {

    let sut: GetStockAvailabilityUsecase
    let props: GetStokAvailabilityInputDto

    beforeEach(() => {
        props = {
            productStockId: "any_id"
        }
        sut = new GetStockAvailabilityUsecase()
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })
})