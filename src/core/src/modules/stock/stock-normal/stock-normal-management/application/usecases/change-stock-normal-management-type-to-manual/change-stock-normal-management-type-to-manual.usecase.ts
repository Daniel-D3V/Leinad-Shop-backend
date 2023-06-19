import { left, right } from "@/modules/@shared/logic";
import { StockManagementAlreadyIsManualError, StockManagementNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockNormalManagementRepositoryInterface } from "../../../domain/repositories";
import { ChangeStockNormalManagementTypeToManualUsecaseInterface } from "../../../domain/usecases";
import { StockNormalManagementTypeChangedToManualEvent } from "./stock-normal-management-type-changed-to-manual.event";

export class ChangeStockNormalManagementTypeToManualUsecase implements ChangeStockNormalManagementTypeToManualUsecaseInterface {

    constructor(
        private readonly stockNormalManagementRepository: StockNormalManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ stockNormalManagementId }: ChangeStockNormalManagementTypeToManualUsecaseInterface.InputDto): Promise<ChangeStockNormalManagementTypeToManualUsecaseInterface.OutputDto> {

        const stockManagementEntity = await this.stockNormalManagementRepository.findById(stockNormalManagementId)
        if (!stockManagementEntity) return left([new StockManagementNotFoundError()])

        if (stockManagementEntity.isStockManual()) return left([new StockManagementAlreadyIsManualError()])

        stockManagementEntity.toStockManual()

        await this.stockNormalManagementRepository.update(stockManagementEntity)

        const stockNormalManagementTypeChangedToManualEvent = new StockNormalManagementTypeChangedToManualEvent({
            stockNormalManagementId: stockManagementEntity.id
        })
        await this.eventEmitter.emit(stockNormalManagementTypeChangedToManualEvent)

        return right(null)
    }
}