import { left, right } from "@/modules/@shared/logic";
import { StockManagementAlreadyIsManualError, StockManagementNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import {  StockTypeChangedToNormalEvent } from "./stock-type-changed-to-normal.event";
import { ChangeStockTypeToNormalUsecaseInterface } from "@/modules/stock/stock-management/domain/usecases"
import { StockManagementRepositoryInterface } from "../../../domain/repositories";

export class ChangeStockTypeToNormalUsecase implements ChangeStockTypeToNormalUsecaseInterface {

    constructor(
        private readonly stockManagementRepository: StockManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ stockManagementId }: ChangeStockTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockTypeToNormalUsecaseInterface.OutputDto> {

        const stockManagementEntity = await this.stockManagementRepository.findById(stockManagementId)
        if (!stockManagementEntity) return left([new StockManagementNotFoundError()])

        if (stockManagementEntity.isStockNormal()) return left([new StockManagementAlreadyIsManualError()])

        stockManagementEntity.toStockNormal()

        await this.stockManagementRepository.update(stockManagementEntity)

        const stockTypeChangedToNormalEvent = new StockTypeChangedToNormalEvent({
            id: stockManagementEntity.id
        })
        await this.eventEmitter.emit(stockTypeChangedToNormalEvent)

        return right(null)
    }
}