import { StockItemAutoEntity } from "./stock-item-auto.entity"


describe("Test StockItemAutoEntity", () => {

    let sut: StockItemAutoEntity
    let props: StockItemAutoEntity.Input

    beforeEach(() => {

        props = {
            stockItemManagementId: "stock_item_management_id",
            value: "any_value"
        }
        sut = StockItemAutoEntity.create(props).value as StockItemAutoEntity
    })
})