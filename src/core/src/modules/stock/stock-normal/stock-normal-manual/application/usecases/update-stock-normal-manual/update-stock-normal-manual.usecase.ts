import { left, right } from "@/modules/@shared/logic";
import { UpdateStockNormalManualUsecaseInterface } from "../../../domain/usecases";
import { StockNormalManualRepositoryInterface } from "../../../domain/repositories";
import { StockNormalManualNotFoundError } from "../_errors";
import { StockNormalManualUpdatedEvent } from "./stock-normal-manual-updated.event";
import { EventEmitterInterface } from "@/modules/@shared/events";


export class UpdateStockNormalManualUsecase implements UpdateStockNormalManualUsecaseInterface {
    
    constructor(
        private readonly stockNormalManualRepository: StockNormalManualRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: UpdateStockNormalManualUsecaseInterface.InputDto): Promise<UpdateStockNormalManualUsecaseInterface.OutputDto> {
        
        const stockNormalManualEntity = await this.stockNormalManualRepository.findById(input.stockNormaManualId)
        if(!stockNormalManualEntity) return left([ new StockNormalManualNotFoundError() ])

        const updateStockResult = stockNormalManualEntity.updateStock(input.stock)
        if(updateStockResult.isLeft()) return left(updateStockResult.value)

        await this.stockNormalManualRepository.update(stockNormalManualEntity)

        const stockNormalManualUpdatedEvent = new StockNormalManualUpdatedEvent({
            stockNormalManualId: stockNormalManualEntity.id,
            stock: stockNormalManualEntity.getCurrentStock()
        })

        await this.eventEmitter.emit(stockNormalManualUpdatedEvent)

        return right(null)
    }
}