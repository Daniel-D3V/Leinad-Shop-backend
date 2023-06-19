import { left, right } from "@/modules/@shared/logic";
import { StockItemNotFoundError, StockItemTypeIsAlreadyManualError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ChangeStockItemManagementTypeToManualUsecaseInterface } from "../../../domain/usecases";
import { StockItemManagementRepositoryInterface } from "../../../domain/repositories";
import { StockItemManagementTypeChangedToManualEvent } from "./stock-item-management-type-changed-to-manual.event";

export class ChangeStockItemManagementTypeToManualUsecase implements ChangeStockItemManagementTypeToManualUsecaseInterface {

    constructor(
        private readonly stockItemManagementRepository: StockItemManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ stockItemManagementId }: ChangeStockItemManagementTypeToManualUsecaseInterface.InputDto): Promise<ChangeStockItemManagementTypeToManualUsecaseInterface.OutputDto> {
        
        const stockItemManagementEntity = await this.stockItemManagementRepository.findById(stockItemManagementId);
        if(!stockItemManagementEntity) return left([ new StockItemNotFoundError() ])

        if(stockItemManagementEntity.isStockTypeManual()) return left([ new StockItemTypeIsAlreadyManualError() ]);

        stockItemManagementEntity.changeToTypeManual();

        await this.stockItemManagementRepository.update(stockItemManagementEntity)

        const stockItemManagementTypeChangedToManualEvent = new StockItemManagementTypeChangedToManualEvent({
            stockItemManagementId: stockItemManagementEntity.id
        })

        await this.eventEmitter.emit(stockItemManagementTypeChangedToManualEvent)

        return right(null);
    }
}