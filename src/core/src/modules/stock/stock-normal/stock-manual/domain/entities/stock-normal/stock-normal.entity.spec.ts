import { StockNormalEntity } from "./stock-normal.entity"


describe("Test StockNormalEntity", () => {

    let sut: StockNormalEntity
    let props: StockNormalEntity.Props
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            stock: 10,
            announceId: "announceId"
        }
        const sutCreated = StockNormalEntity.create(props, id)
        sut = sutCreated.value as StockNormalEntity
    })

    it("should return correct json", () => {
        expect(sut.toJSON()).toEqual({
            id,
            stock: 10,
            announceId: "announceId"
        })
    })

})