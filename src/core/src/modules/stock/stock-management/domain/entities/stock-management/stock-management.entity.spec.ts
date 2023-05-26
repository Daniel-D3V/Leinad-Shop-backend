import { StockManagementEntity } from "./stock-management.entity"


describe("Test StockManagementEntity", () => {

    let sut: StockManagementEntity
    let id: string

    beforeEach(() => {
        id = "any_id"
        sut = StockManagementEntity.create(id)
    })

    it("Should create a new StockManagementEntity", () => {
        sut = StockManagementEntity.create(id)
        expect(sut.toJSON()).toMatchObject({
            id,
            stockType: "NORMAL"
        })
    })

    it("Should change to stock AUTO", () => {
        expect(sut.stockType).toBe("NORMAL")
        sut.toStockAuto()
        expect(sut.stockType).toBe("AUTO")
    })

    it("Should change to stock NORMAL", () => {
        sut.toStockAuto()
        expect(sut.stockType).toBe("AUTO")
        sut.toStockNormal()
        expect(sut.stockType).toBe("NORMAL")
    })  

    it("Should check if stock is NORMAL", () => {
        expect(sut.stockType).toBe("NORMAL")
        expect(sut.isStockNormal()).toBe(true)
    })  
        
    it("Should check if stock is AUTO", () => {
        sut.toStockAuto()
        expect(sut.stockType).toBe("AUTO")
        expect(sut.isStockAuto()).toBe(true)
    })
})