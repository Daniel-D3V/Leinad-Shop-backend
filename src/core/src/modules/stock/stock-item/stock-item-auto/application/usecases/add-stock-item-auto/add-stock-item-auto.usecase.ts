import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemAutoRepositoryInterface } from "../../../domain/repositories";
import { AddStockItemAutoUsecaseInterface } from "../../../domain/usecases";
import { StockItemAutoEntity } from "../../../domain/entities";
import { left, right } from "@/modules/@shared/logic";
import { StockItemAutoAddedEvent } from "./stock-item-auto-added.event";


export class AddStockItemAutoUsecase implements AddStockItemAutoUsecaseInterface {
    
    constructor(
        private readonly stockItemAutoRepository: StockItemAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: AddStockItemAutoUsecaseInterface.InputDto): Promise<AddStockItemAutoUsecaseInterface.OutputDto> {
        
        const stockItemAutoEntity = StockItemAutoEntity.create({
            ...input
        })
        if(stockItemAutoEntity.isLeft()) return left(stockItemAutoEntity.value)

        await this.stockItemAutoRepository.create(stockItemAutoEntity.value)

        const stockItemAutoAddedEvent = new StockItemAutoAddedEvent({
            ...stockItemAutoEntity.value.toJSON()
        })

        await this.eventEmitter.emit(stockItemAutoAddedEvent)

        return right({
            id: stockItemAutoEntity.value.id
        })
    }
}