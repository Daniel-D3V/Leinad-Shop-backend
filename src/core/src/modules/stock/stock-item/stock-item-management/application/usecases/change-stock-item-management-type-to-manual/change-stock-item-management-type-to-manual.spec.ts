
import { mock } from "jest-mock-extended";
import { StockItemManagementTypeChangedToManualEvent } from "./stock-item-management-type-changed-to-manual.event";
import { ChangeStockItemManagementTypeToManualUsecase } from "./change-stock-item-management-type-to-manual.usecase";
import { ChangeStockItemManagementTypeToManualUsecaseInterface } from "../../../domain/usecases";
import { StockItemManagementRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemManagementEntity } from "../../../domain/entities";

jest.mock("./stock-item-management-type-changed-to-manual.event")

describe("Test ChangeStockItemTypeToAuto", () => {

    let sut: ChangeStockItemManagementTypeToManualUsecase;
    let props: ChangeStockItemManagementTypeToManualUsecaseInterface.InputDto
    let stockItemManagementRepository: StockItemManagementRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemManagementEntity: StockItemManagementEntity

    beforeEach(() => {

        props = {
            stockItemManagementId: "stock_item_management_id"
        }
        stockItemManagementEntity = mock<StockItemManagementEntity>({
            id: "any_id"
        })
        stockItemManagementRepository = mock<StockItemManagementRepositoryInterface>({
            findById: async () => stockItemManagementEntity,
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeStockItemManagementTypeToManualUsecase(stockItemManagementRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return StockItemNotFoundError if stock item does not exists", async () => {
        jest.spyOn(stockItemManagementRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value![0].name).toBe("StockItemNotFoundError")
    })

    it("Should return StockItemTypeIsAlreadyManualError if stock item type is already manual", async () => {
        jest.spyOn(stockItemManagementEntity, "isStockTypeManual").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value![0].name).toBe("StockItemTypeIsAlreadyManualError")
    })

    it("Should call changeToTypeManual method from stock item entity", async () => {
        await sut.execute(props)
        expect(stockItemManagementEntity.changeToTypeManual).toHaveBeenCalledTimes(1)
    })

    it("Should call update method from stockItemRepository", async () => {
        await sut.execute(props)
        expect(stockItemManagementRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call emit method from eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create  StockItemManagementTypeChangedToManualEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockItemManagementTypeChangedToManualEvent).toHaveBeenCalledWith({
            stockItemManagementId: stockItemManagementEntity.id
        })
    })
})