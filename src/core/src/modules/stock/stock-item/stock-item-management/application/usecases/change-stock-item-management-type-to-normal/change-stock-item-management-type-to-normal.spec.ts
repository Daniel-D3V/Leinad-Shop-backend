
import { mock } from "jest-mock-extended";
import { StockItemManagementTypeChangedToNormalEvent } from "./stock-item-management-type-changed-to-normal.event";
import { ChangeStockItemManagementTypeToNormalUsecase } from "./change-stock-item-management-type-to-normal.usecase";
import { ChangeStockItemManagementTypeToNormalUsecaseInterface } from "../../../domain/usecases";
import { StockItemManagementRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemManagementEntity } from "../../../domain/entities";

jest.mock("./stock-item-management-type-changed-to-normal.event")

describe("Test ChangeStockItemTypeToAuto", () => {

    let sut: ChangeStockItemManagementTypeToNormalUsecase;
    let props: ChangeStockItemManagementTypeToNormalUsecaseInterface.InputDto
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
        sut = new ChangeStockItemManagementTypeToNormalUsecase(stockItemManagementRepository, eventEmitter)
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

    it("Should return StockItemTypeIsAlreadyNormalError if stock item type is already normal", async () => {
        jest.spyOn(stockItemManagementEntity, "isStockTypeNormal").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value![0].name).toBe("StockItemTypeIsAlreadyNormalError")
    })

    it("Should call changeToTypeNormal method from stock item entity", async () => {
        await sut.execute(props)
        expect(stockItemManagementEntity.changeToTypeNormal).toHaveBeenCalledTimes(1)
    })

    it("Should call update method from stockItemRepository", async () => {
        await sut.execute(props)
        expect(stockItemManagementRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call emit method from eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create  StockItemManagementTypeChangedToNormalEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockItemManagementTypeChangedToNormalEvent).toHaveBeenCalledWith({
            stockItemManagementId: stockItemManagementEntity.id
        })
    })
})