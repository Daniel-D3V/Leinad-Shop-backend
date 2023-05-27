import { EventEmitterInterface } from "@/modules/@shared/events"
import { left, right } from "@/modules/@shared/logic"
import { StockItemAutoRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories"
import { DeleteStockItemAutoUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases"
import { StockItemAutoNotFoundError } from "../_errors"
import { StockItemAutoDeletedEvent } from "./stock-item-auto-deleted.event"


export class DeleteStockItemAutoUsecase implements DeleteStockItemAutoUsecaseInterface {
    
    constructor(
        private readonly stockItemAutoRepository: StockItemAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}
    
    async execute({ stockItemAutoId }: DeleteStockItemAutoUsecaseInterface.InputDto): Promise<DeleteStockItemAutoUsecaseInterface.OutputDto> {
        
        const stockItemAuto = await this.stockItemAutoRepository.findById(stockItemAutoId)
        if(!stockItemAuto) return left([ new StockItemAutoNotFoundError() ])

        await this.stockItemAutoRepository.delete(stockItemAuto.id)

        const stockItemAutoDeletedEvent = new StockItemAutoDeletedEvent({
            stockItemAutoId: stockItemAuto.id
        })

        await this.eventEmitter.emit(stockItemAutoDeletedEvent)

        return right(null)
    }

}