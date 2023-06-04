import { StockAutoEntity } from "./stock-auto.entity"


describe("Test StockAutoEntity", () => {

    let sut: StockAutoEntity
    let props: StockAutoEntity.Input
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            value: "any_value",
            stockManagementId: "any_stock_management_id"
        }
        sut = StockAutoEntity.create(props, id).value as StockAutoEntity
    })

    it("Should create a StockAutoEntity", () => {
        expect(sut.toJSON()).toEqual({
            id,
            ...props 
        })
    })

})