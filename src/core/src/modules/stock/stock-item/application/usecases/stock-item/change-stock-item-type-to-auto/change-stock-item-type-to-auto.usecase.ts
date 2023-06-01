import { left, right } from "@/modules/@shared/logic";
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { ChangeStockItemTypeToAutoUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { StockItemNotFoundError, StockItemTypeIsAlreadyAutoError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemTypeChangedToAutoEvent } from "./stock-item-type-changed-to-auto.event";

export class ChangeStockItemTypeToAutoUsecase implements ChangeStockItemTypeToAutoUsecaseInterface {

    constructor(
        private readonly stockItemRepository: StockItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ stockItemId }: ChangeStockItemTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockItemTypeToAutoUsecaseInterface.OutputDto> {
        
        const stockItemEntity = await this.stockItemRepository.findById(stockItemId);
        if(!stockItemEntity) return left([ new StockItemNotFoundError() ])

        if(stockItemEntity.isStockTypeAuto()) return left([ new StockItemTypeIsAlreadyAutoError() ])

        stockItemEntity.changeToTypeAuto();

        await this.stockItemRepository.update(stockItemEntity)

        const stockItemTypeChangedToAutoEvent = new StockItemTypeChangedToAutoEvent({
            stockItemId: stockItemEntity.id
        })

        await this.eventEmitter.emit(stockItemTypeChangedToAutoEvent)

        return right(null);
    }
}