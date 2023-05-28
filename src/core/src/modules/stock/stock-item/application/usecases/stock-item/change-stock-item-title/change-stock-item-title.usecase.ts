import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { ChangeStockItemTitleUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { StockItemNotFoundError } from "../_errors";
import { StockItemTitleChangedEvent } from "./stock-item-title-changed.event";


export class ChangeStockItemTitleUsecase implements ChangeStockItemTitleUsecaseInterface {
    
    constructor(
        private readonly stockItemRepository: StockItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}


    async execute({ stockItemId, title }: ChangeStockItemTitleUsecaseInterface.InputDto): Promise<ChangeStockItemTitleUsecaseInterface.OutputDto> {
        
        const stockItemEntity = await this.stockItemRepository.findById(stockItemId)
        if(!stockItemEntity) return left([ new StockItemNotFoundError() ])

        const changeResult = stockItemEntity.changeTitle(title)
        if(changeResult.isLeft()) return left(changeResult.value)

        await this.stockItemRepository.update(stockItemEntity)

        const stockItemTitleChangedEvent = new StockItemTitleChangedEvent({
            stockItemId: stockItemEntity.id,
            title: stockItemEntity.title
        })

        await this.eventEmitter.emit(stockItemTitleChangedEvent)

        return right(null)
    }
}