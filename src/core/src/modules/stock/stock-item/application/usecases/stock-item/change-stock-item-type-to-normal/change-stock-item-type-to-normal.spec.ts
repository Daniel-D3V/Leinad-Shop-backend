import { ChangeStockItemTypeToAutoUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { ChangeStockItemTypeToNormalUsecase } from "./change-stock-item-type-to-normal.usecase";
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemEntity } from "@/modules/stock/stock-item/domain/entities";
import { mock } from "jest-mock-extended";
import { StockItemTypeChangedToNormalEvent } from "./stock-item-type-changed-to-normal.event";

jest.mock("./stock-item-type-changed-to-normal.event")

describe("Test ChangeStockItemTypeToAuto", () => {

    let sut: ChangeStockItemTypeToNormalUsecase;
    let props: ChangeStockItemTypeToAutoUsecaseInterface.InputDto
    let stockItemRepository: StockItemRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemEntity: StockItemEntity

    beforeEach(() => {

        props = {
            stockItemId: "any_stock_item_id"
        }
        stockItemEntity = mock<StockItemEntity>({
            id: "any_id"
        })
        stockItemRepository = mock<StockItemRepositoryInterface>({
            findById: async () => stockItemEntity,
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeStockItemTypeToNormalUsecase(stockItemRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return StockItemNotFoundError if stock item does not exists", async () => {
        jest.spyOn(stockItemRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value![0].name).toBe("StockItemNotFoundError")
    })

    it("Should call changeToTypeNormal method from stock item entity", async () => {
        await sut.execute(props)
        expect(stockItemEntity.changeToTypeNormal).toHaveBeenCalledTimes(1)
    })

    it("Should call update method from stockItemRepository", async () => {
        await sut.execute(props)
        expect(stockItemRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call emit method from eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create  StockItemTypeChangedToAutoEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockItemTypeChangedToNormalEvent).toHaveBeenCalledWith({
            stockItemId: stockItemEntity.id
        })
    })
})