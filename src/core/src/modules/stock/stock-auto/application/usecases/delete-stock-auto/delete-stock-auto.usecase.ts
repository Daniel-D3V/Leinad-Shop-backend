import { Either, left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockAutoDeletedEvent } from "./stock-auto-deleted.event";
import { DeleteStockAutoUsecaseInterface } from "../../../domain/usecases";
import { StockAutoRepositoryInterface } from "../../../domain/repository";
import { StockAutoNotFoundError } from "../_errors";

export class DeleteStockAutoUsecase implements DeleteStockAutoUsecaseInterface {

    constructor(
        private readonly stockAutoRepository: StockAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ stockAutoId }: DeleteStockAutoUsecaseInterface.InputDto): Promise<DeleteStockAutoUsecaseInterface.OutputDto> {

        const stockAutoEntity = await this.stockAutoRepository.findById(stockAutoId)
        if (!stockAutoEntity) return left([new StockAutoNotFoundError()])

        await this.stockAutoRepository.delete(stockAutoId)

        const stockAutoDeletedEvent = new StockAutoDeletedEvent({
            stockAutoId: stockAutoId
        })

        await this.eventEmitter.emit(stockAutoDeletedEvent)

        return right(null)
    }
}