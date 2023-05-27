import { left, right } from "@/modules/@shared/logic";
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import {  ChangeStockItemTypeToNormalUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { StockItemNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemTypeChangedToNormalEvent } from "./stock-item-type-changed-to-normal.event";

export class ChangeStockItemTypeToNormalUsecase implements ChangeStockItemTypeToNormalUsecaseInterface {

    constructor(
        private readonly stockItemRepository: StockItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ stockItemId }: ChangeStockItemTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockItemTypeToNormalUsecaseInterface.OutputDto> {
        
        const stockItemEntity = await this.stockItemRepository.findById(stockItemId);
        if(!stockItemEntity) return left([ new StockItemNotFoundError() ])

        stockItemEntity.changeToTypeNormal();

        await this.stockItemRepository.update(stockItemEntity)

        const stockItemTypeChangedToNormalEvent = new StockItemTypeChangedToNormalEvent({
            stockItemId: stockItemEntity.id
        })

        await this.eventEmitter.emit(stockItemTypeChangedToNormalEvent)

        return right(null);
    }
}