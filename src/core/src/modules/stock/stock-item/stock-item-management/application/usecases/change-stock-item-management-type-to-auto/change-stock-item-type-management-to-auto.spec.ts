
import { mock } from "jest-mock-extended";
import { ChangeStockItemManagementTypeToAutoUsecase } from "./change-stock-item-management-type-to-auto.usecase";
import { ChangeStockItemManagementTypeToAutoUsecaseInterface } from "../../../domain/usecases";
import { StockItemManagementRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemManagementEntity } from "../../../domain/entities";
import { StockItemManagementTypeChangedToAutoEvent } from "./stock-item-management-type-changed-to-auto.event";



jest.mock("./stock-item-management-type-changed-to-auto.event")

describe("Test ChangeStockItemTypeToAuto", () => {

    let sut: ChangeStockItemManagementTypeToAutoUsecase;
    let props: ChangeStockItemManagementTypeToAutoUsecaseInterface.InputDto
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
        sut = new ChangeStockItemManagementTypeToAutoUsecase(stockItemManagementRepository, eventEmitter)
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

    it("Should return StockItemTypeIsAlreadyAutoError if stock item type is already auto", async () => {
        jest.spyOn(stockItemManagementEntity, "isStockTypeAuto").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBeTruthy()
        expect(output.value![0].name).toBe("StockItemTypeIsAlreadyAutoError")
    })

    it("Should call changeToTypeAuto method from stock item entity", async () => {
        await sut.execute(props)
        expect(stockItemManagementEntity.changeToTypeAuto).toHaveBeenCalledTimes(1)
    })

    it("Should call update method from stockItemManagementRepository", async () => {
        await sut.execute(props)
        expect(stockItemManagementRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call emit method from eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create  StockItemManagementTypeChangedToAutoEvent with correct values", async () => {
        await sut.execute(props)
        expect(StockItemManagementTypeChangedToAutoEvent).toHaveBeenCalledWith({
            stockItemManagementId: stockItemManagementEntity.id
        })
    })
})