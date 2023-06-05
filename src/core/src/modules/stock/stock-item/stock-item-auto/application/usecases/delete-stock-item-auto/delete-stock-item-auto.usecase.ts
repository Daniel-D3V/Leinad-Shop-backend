import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemAutoRepositoryInterface } from "../../../domain/repositories";
import { DeleteStockItemAutoUsecaseInterface } from "../../../domain/usecases";
import { left, right } from "@/modules/@shared/logic";
import { StockItemAutoNotFoundError } from "../_errors";
import { StockItemAutoDeletedEvent } from "./stock-item-auto-deleted.event";


export class DeleteStockItemAutoUsecase implements DeleteStockItemAutoUsecaseInterface {

    constructor(
        private readonly stockItemAutoRepository: StockItemAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface 
    ){}

    async execute({ stockItemAutoId }: DeleteStockItemAutoUsecaseInterface.InputDto): Promise<DeleteStockItemAutoUsecaseInterface.OutputDto> {
        
        const stockItemAutoEntity = await this.stockItemAutoRepository.findById(stockItemAutoId)
        if(!stockItemAutoEntity) return left([ new StockItemAutoNotFoundError() ])

        await this.stockItemAutoRepository.delete(stockItemAutoEntity.id)

        const stockItemAutoDeletedEvent = new StockItemAutoDeletedEvent({
            stockItemAutoId: stockItemAutoEntity.id
        })

        await this.eventEmitter.emit(stockItemAutoDeletedEvent)

        return right(null)
    }
}