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
            stockType: "MANUAL",
            ...props
        })
    })

    it("Should change to stock AUTO", () => {
        expect(sut.stockType).toBe("MANUAL")
        sut.toStockAuto()
        expect(sut.stockType).toBe("AUTO")
    })

    it("Should change to stock MANUAL", () => {
        sut.toStockAuto()
        expect(sut.stockType).toBe("AUTO")
        sut.toStockManual()
        expect(sut.stockType).toBe("MANUAL")
    })  

    it("Should check if stock is MANUAL", () => {
        expect(sut.stockType).toBe("MANUAL")
        expect(sut.isStockManual()).toBe(true)
    })  
        
    it("Should check if stock is AUTO", () => {
        sut.toStockAuto()
        expect(sut.stockType).toBe("AUTO")
        expect(sut.isStockAuto()).toBe(true)
    })


})