import { left, right } from "@/modules/@shared/logic";
import { StockItemNotFoundError, StockItemTypeIsAlreadyAutoError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemManagementTypeChangedToAutoEvent } from "./stock-item-management-type-changed-to-auto.event";
import { ChangeStockItemManagementTypeToAutoUsecaseInterface } from "../../../domain/usecases";
import { StockItemManagementRepositoryInterface } from "../../../domain/repositories";

export class ChangeStockItemManagementTypeToAutoUsecase implements ChangeStockItemManagementTypeToAutoUsecaseInterface {

    constructor(
        private readonly stockItemManagementRepository: StockItemManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ stockItemManagementId }: ChangeStockItemManagementTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockItemManagementTypeToAutoUsecaseInterface.OutputDto> {
        
        const stockItemManagementEntity = await this.stockItemManagementRepository.findById(stockItemManagementId);
        if(!stockItemManagementEntity) return left([ new StockItemNotFoundError() ])

        if(stockItemManagementEntity.isStockTypeAuto()) return left([ new StockItemTypeIsAlreadyAutoError() ])

        stockItemManagementEntity.changeToTypeAuto();

        await this.stockItemManagementRepository.update(stockItemManagementEntity)

        const stockItemManagementTypeChangedToAutoEvent = new StockItemManagementTypeChangedToAutoEvent({
            stockItemManagementId: stockItemManagementEntity.id
        })

        await this.eventEmitter.emit(stockItemManagementTypeChangedToAutoEvent)

        return right(null);
    }
}