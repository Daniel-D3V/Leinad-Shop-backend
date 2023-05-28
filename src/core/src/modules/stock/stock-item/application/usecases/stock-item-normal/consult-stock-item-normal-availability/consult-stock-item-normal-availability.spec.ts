import { ConsultStockItemNormalAvailabilityUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases"
import { ConsultStockItemNormalAvailabilityUsecase } from "./consult-stock-item-normal-availability.usecase"
import { StockItemNormalRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories"
import { mock } from "jest-mock-extended"
import { StockItemNormalEntity } from "@/modules/stock/_base"


describe("Test ConsultStockItemNormalAvailabilityUsecase", () => {

    let sut: ConsultStockItemNormalAvailabilityUsecase
    let props: ConsultStockItemNormalAvailabilityUsecaseInterface.InputDto
    let stockItemNormalRepository: StockItemNormalRepositoryInterface
    let stockItemNormalEntity: StockItemNormalEntity

    beforeEach(() => {

        props = {
            stockItemId: "any_stock_item_Id"
        }
        stockItemNormalEntity = mock<StockItemNormalEntity>()
        stockItemNormalRepository = mock<StockItemNormalRepositoryInterface>({
            findByStockItemId: async () => stockItemNormalEntity
        })
        sut = new ConsultStockItemNormalAvailabilityUsecase(stockItemNormalRepository)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return StockItemNormalNotFoundError if stockItemNormalEntity can not be found", async () => {
        jest.spyOn(stockItemNormalRepository, "findByStockItemId")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("It Should not be right")
        expect(output.value[0].name).toBe("StockItemNormalNotFoundError")
    })

    it("Should call getCurrentStock once", async () => {
        await sut.execute(props)
        expect(stockItemNormalEntity.getCurrentStock)
    })

})