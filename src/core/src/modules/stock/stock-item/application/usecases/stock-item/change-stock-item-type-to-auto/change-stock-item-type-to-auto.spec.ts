import { ChangeStockItemTypeToAutoUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { ChangeStockItemTypeToAutoUsecase } from "./change-stock-item-type-to-auto.usecase";
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemEntity } from "@/modules/stock/stock-item/domain/entities";
import { mock } from "jest-mock-extended";
import { StockItemTypeChangedToAutoEvent } from "./stock-item-type-changed-to-auto.event";

jest.mock("./stock-item-type-changed-to-auto.event")

describe("Test ChangeStockItemTypeToAuto", () => {

    let sut: ChangeStockItemTypeToAutoUsecase;
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
        sut = new ChangeStockItemTypeToAutoUsecase(stockItemRepository, eventEmitter)
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

    it("Should return StockItemTypeIsAlreadyAutoError if stock item type is already auto", async () => {
        jest.spyOn(stockItemEntity, "isStockTypeAuto").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value![0].name).toBe("StockItemTypeIsAlreadyAutoError")
    })

    it("Should call changeToTypeAuto method from stock item entity", async () => {
        await sut.execute(props)
        expect(stockItemEntity.changeToTypeAuto).toHaveBeenCalledTimes(1)
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
        expect(StockItemTypeChangedToAutoEvent).toHaveBeenCalledWith({
            stockItemId: stockItemEntity.id
        })
    })
})