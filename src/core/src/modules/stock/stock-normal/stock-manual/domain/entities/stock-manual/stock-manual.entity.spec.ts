import { StockManualEntity } from "./stock-manual.entity"


describe("Test StockNormalEntity", () => {

    let sut: StockManualEntity
    let props: StockManualEntity.Props
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            stock: 10,
            stockManagementId: "any_stock_management_id"
        }
        const sutCreated = StockManualEntity.create(props, id)
        sut = sutCreated.value as StockManualEntity
    })

    it("should return correct json", () => {
        expect(sut.toJSON()).toEqual({
            id,
            ...props
        })
    })

})