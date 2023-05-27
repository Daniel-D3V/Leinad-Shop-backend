import { left, right } from "@/modules/@shared/logic";
import { AddStockItemAutoUsecaseInterface } from "../../../../domain/usecases";
import { StockItemAutoRepositoryInterface } from "../../../../domain/repositories";
import { StockItemAutoEntity } from "@/modules/stock/_base";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemAutoAddedEvent } from "./stock-item-auto-added.event";

export class AddStockItemAutoUsecase implements AddStockItemAutoUsecaseInterface {
    
    constructor(
        private readonly stockItemAutoRepository: StockItemAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ stockItemId, value }: AddStockItemAutoUsecaseInterface.InputDto): Promise<AddStockItemAutoUsecaseInterface.OutputDto> {
        
        const stockItemAutoEntity = StockItemAutoEntity.create({
            stockItemId,
            value
        })
        if(stockItemAutoEntity.isLeft()) return left(stockItemAutoEntity.value)

        await this.stockItemAutoRepository.create(stockItemAutoEntity.value)

        const stockItemAutoAddedEvent = new StockItemAutoAddedEvent({
            ...stockItemAutoEntity.value.toJSON()
        })

        await this.eventEmitter.emit(stockItemAutoAddedEvent)

        return right({
            id: stockItemAutoEntity.value.id,
        })
    }
}