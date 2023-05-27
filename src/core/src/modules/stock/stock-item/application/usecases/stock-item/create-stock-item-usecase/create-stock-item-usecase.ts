import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { StockItemEntity } from "@/modules/stock/stock-item/domain/entities";
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { CreateStockItemUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { StockItemCreatedEvent } from "./stock-item-created.event";


export class CreateStockItemUsecase implements CreateStockItemUsecaseInterface {

    constructor(
        private readonly stockItemRepository: StockItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId, price }: CreateStockItemUsecaseInterface.InputDto): Promise<CreateStockItemUsecaseInterface.OutputDto> {
        
        const stockItemEntity = StockItemEntity.create({
            announceId,
            price
        })
        if(stockItemEntity.isLeft()) return left(stockItemEntity.value)

        await this.stockItemRepository.create(stockItemEntity.value)

        const stockItemCreatedEvent = new StockItemCreatedEvent({
            ...stockItemEntity.value.toJSON()
        })
        await this.eventEmitter.emit(stockItemCreatedEvent)

        return right({
            id: stockItemCreatedEvent.id
        })
    }
}