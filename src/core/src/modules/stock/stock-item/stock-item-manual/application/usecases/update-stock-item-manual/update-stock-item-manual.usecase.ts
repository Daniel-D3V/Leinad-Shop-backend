import { left, right } from "@/modules/@shared/logic";
import { UpdateStockItemManualUsecaseInterface } from "../../../domain/usecases";
import { StockItemManualRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemManualNotFoundError } from "../_errors";
import { StockItemManualUpdatedEvent } from "./stock-item-manual-updated.event";


export class UpdateStockItemManualUsecase implements UpdateStockItemManualUsecaseInterface {
    
    constructor(
        private readonly stockItemManualRepository: StockItemManualRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: UpdateStockItemManualUsecaseInterface.InputDto): Promise<UpdateStockItemManualUsecaseInterface.OutputDto> {
        
        const stockItemManualEntity = await this.stockItemManualRepository.findById(input.stockItemManualId)
        if(!stockItemManualEntity) return left([ new StockItemManualNotFoundError() ])

        const updateStockResult = stockItemManualEntity.updateStock(input.stock)
        if(updateStockResult.isLeft()) return left(updateStockResult.value)

        await this.stockItemManualRepository.update(stockItemManualEntity)

        const stockItemManualUpdatedEvent = new StockItemManualUpdatedEvent({
            stockItemManualId: stockItemManualEntity.id,
            stock: stockItemManualEntity.getCurrentStock()
        })

        await this.eventEmitter.emit(stockItemManualUpdatedEvent)

        return right(null)
    }
}