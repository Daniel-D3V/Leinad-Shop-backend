import { left, right } from "@/modules/@shared/logic";
import { StockItemNormalRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { UpdateStockItemNormalUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { StockItemNormalNotFoundError } from "../errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemNormalUpdatedEvent } from "./stock-item-normal-updated.event";

export class UpdateStockItemNormalUsecase implements UpdateStockItemNormalUsecaseInterface {
    
    constructor(
        private readonly stockItemNormalRepository: StockItemNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ stockItemNormalId, stock }: UpdateStockItemNormalUsecaseInterface.InputDto): Promise<UpdateStockItemNormalUsecaseInterface.OutputDto> {
        
        const stockItemNormalEntity = await this.stockItemNormalRepository.findById(stockItemNormalId)
        if(!stockItemNormalEntity) return left([ new StockItemNormalNotFoundError() ])

        const updateStockResult = stockItemNormalEntity.updateStock(stock)
        if(updateStockResult.isLeft()) return left(updateStockResult.value)

        await this.stockItemNormalRepository.update(stockItemNormalEntity)

        const stockItemNormalUpdatedEvent = new StockItemNormalUpdatedEvent({
            stockItemNormalId: stockItemNormalEntity.id,
            stock: stockItemNormalEntity.getCurrentStock()
        })

        await this.eventEmitter.emit(stockItemNormalUpdatedEvent)

        return right(null)
    }
}