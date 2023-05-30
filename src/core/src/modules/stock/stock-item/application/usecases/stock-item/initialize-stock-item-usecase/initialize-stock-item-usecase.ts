import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { StockItemEntity } from "@/modules/stock/stock-item/domain/entities";
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { InitializeStockItemUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { StockItemCreatedEvent } from "./stock-item-created.event";
import { StockItemAlreadyCreatedError } from "./errors";


export class InitializeStockItemUsecase implements InitializeStockItemUsecaseInterface {

    constructor(
        private readonly stockItemRepository: StockItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceItemId }: InitializeStockItemUsecaseInterface.InputDto): Promise<InitializeStockItemUsecaseInterface.OutputDto> {
        
        const stockItemEntity = StockItemEntity.create({
            announceItemId
        })
        if(stockItemEntity.isLeft()) return left(stockItemEntity.value)

        const stockItemCreated = await this.stockItemRepository.findByAnnounceItemId(announceItemId)
        if(stockItemCreated) return left([ new StockItemAlreadyCreatedError() ])

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