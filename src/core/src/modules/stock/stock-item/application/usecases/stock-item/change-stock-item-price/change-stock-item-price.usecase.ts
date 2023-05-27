import { left, right } from "@/modules/@shared/logic";
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { ChangeStockItemPriceUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { StockItemNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemPriceChangedEvent } from "./stock-item-price-changed.event";

export class ChangeStockItemPriceUsecase implements ChangeStockItemPriceUsecaseInterface {

    constructor(
        private readonly stockItemRepository: StockItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ price, stockItemId }: ChangeStockItemPriceUsecaseInterface.InputDto): Promise<ChangeStockItemPriceUsecaseInterface.OutputDto> {
        
        const stockItemEntity = await this.stockItemRepository.findById(stockItemId)
        if(!stockItemEntity) return left([ new StockItemNotFoundError() ])

        const changeResult = stockItemEntity.changePrice(price)
        if(changeResult.isLeft()) return left(changeResult.value)

        await this.stockItemRepository.update(stockItemEntity)

        const stockItemPriceChangedEvent = new StockItemPriceChangedEvent({
            stockItemId: stockItemEntity.id,
            price: stockItemEntity.price
        })

        await this.eventEmitter.emit(stockItemPriceChangedEvent)

        return right(null)
    }
}