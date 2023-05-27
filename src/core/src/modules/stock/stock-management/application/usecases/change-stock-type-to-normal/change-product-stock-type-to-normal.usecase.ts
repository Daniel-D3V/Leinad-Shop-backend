import { left, right } from "@/modules/@shared/logic";
import { ProductStockAlreadyIsManualError, ProductStockNotFoundError } from "../_errors";
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
        if (!stockManagementEntity) return left([new ProductStockNotFoundError()])

        if (stockManagementEntity.isStockNormal()) return left([new ProductStockAlreadyIsManualError()])

        stockManagementEntity.toStockNormal()

        await this.stockManagementRepository.update(stockManagementEntity)

        const stockTypeChangedToNormalEvent = new StockTypeChangedToNormalEvent({
            id: stockManagementEntity.id
        })
        await this.eventEmitter.emit(stockTypeChangedToNormalEvent)

        return right(null)
    }
}