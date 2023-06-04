import { Either, left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { DeleteStockNormalAutoUsecaseInterface } from "../../../domain/usecases";
import { StockNormalAutoRepositoryInterface } from "../../../domain/repository";
import { StockAutoNotFoundError } from "../_errors";
import { StockNormalAutoDeletedEvent } from "./stock-normal-auto-deleted.event";

export class DeleteStockNormalAutoUsecase implements DeleteStockNormalAutoUsecaseInterface {

    constructor(
        private readonly stockNormalAutoRepository: StockNormalAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ stockNormalAutoId }: DeleteStockNormalAutoUsecaseInterface.InputDto): Promise<DeleteStockNormalAutoUsecaseInterface.OutputDto> {

        const stockAutoEntity = await this.stockNormalAutoRepository.findById(stockNormalAutoId)
        if (!stockAutoEntity) return left([new StockAutoNotFoundError()])

        await this.stockNormalAutoRepository.delete(stockNormalAutoId)

        const stockNormalAutoDeletedEvent = new StockNormalAutoDeletedEvent({
            stockNormalAutoId: stockNormalAutoId    
        })

        await this.eventEmitter.emit(stockNormalAutoDeletedEvent)

        return right(null)
    }
}