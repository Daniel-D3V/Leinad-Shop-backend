import { StockItemAutoEntity } from "./stock-item-auto.entity"


describe("Test StockItemAutoEntity", () => {

    let sut: StockItemAutoEntity
    let props: StockItemAutoEntity.Input

    beforeEach(() => {

        props = {
            announceItemId: "any_announce_item_id",
            value: "any_value"
        }
        sut = StockItemAutoEntity.create(props).value as StockItemAutoEntity
    })
    it("", () => {})
})