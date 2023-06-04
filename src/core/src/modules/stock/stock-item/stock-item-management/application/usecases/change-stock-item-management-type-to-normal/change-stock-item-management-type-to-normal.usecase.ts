import { left, right } from "@/modules/@shared/logic";
import { StockItemNotFoundError, StockItemTypeIsAlreadyNormalError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ChangeStockItemManagementTypeToNormalUsecaseInterface } from "../../../domain/usecases";
import { StockItemManagementRepositoryInterface } from "../../../domain/repositories";
import { StockItemManagementTypeChangedToNormalEvent } from "./stock-item-management-type-changed-to-normal.event";

export class ChangeStockItemManagementTypeToNormalUsecase implements ChangeStockItemManagementTypeToNormalUsecaseInterface {

    constructor(
        private readonly stockItemManagementRepository: StockItemManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ stockItemManagementId }: ChangeStockItemManagementTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockItemManagementTypeToNormalUsecaseInterface.OutputDto> {
        
        const stockItemManagementEntity = await this.stockItemManagementRepository.findById(stockItemManagementId);
        if(!stockItemManagementEntity) return left([ new StockItemNotFoundError() ])

        if(stockItemManagementEntity.isStockTypeNormal()) return left([ new StockItemTypeIsAlreadyNormalError() ]);

        stockItemManagementEntity.changeToTypeNormal();

        await this.stockItemManagementRepository.update(stockItemManagementEntity)

        const stockItemManagementTypeChangedToNormalEvent = new StockItemManagementTypeChangedToNormalEvent({
            stockItemManagementId: stockItemManagementEntity.id
        })

        await this.eventEmitter.emit(stockItemManagementTypeChangedToNormalEvent)

        return right(null);
    }
}