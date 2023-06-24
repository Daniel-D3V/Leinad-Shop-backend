import { StockNormalAutoEntity } from "./stock-normal-auto.entity"


describe("Test StockNormalAutoEntity", () => {

    let sut: StockNormalAutoEntity
    let props: StockNormalAutoEntity.Input
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            value: "any_value",
            announceNormalId: "any_announce_normal_id"
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