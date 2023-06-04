import { StockNormalManagementEntity } from "./stock-normal-management.entity"



describe("Test StockManagementEntity", () => {

    let sut: StockNormalManagementEntity
    let id: string
    let props: StockNormalManagementEntity.Input

    beforeEach(() => {
        id = "any_id"
        props = {
            announceNormalId: "any_announce_normal_id"
        }
        sut = StockNormalManagementEntity.create(props, id)
    })

    it("Should create a new StockNormalManagementEntity", () => {
        sut = StockNormalManagementEntity.create(props, id)
        expect(sut.toJSON()).toMatchObject({
            id,
            stockType: "NORMAL",
            ...props
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