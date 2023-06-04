import { StockNormalAutoEntity } from "./stock-normal-auto.entity"


describe("Test StockNormalAutoEntity", () => {

    let sut: StockNormalAutoEntity
    let props: StockNormalAutoEntity.Input
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            value: "any_value",
            stockNormalManagementId: "any_stock_normal_management_id"
        }
        sut = StockNormalAutoEntity.create(props, id).value as StockNormalAutoEntity
    })

    it("Should create a StockAutoEntity", () => {
        expect(sut.toJSON()).toEqual({
            id,
            ...props 
        })
    })

})