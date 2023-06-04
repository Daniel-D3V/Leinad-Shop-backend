import { Either, left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockAutoValueChangedEvent } from "./stock-auto-value-changed.event";
import { ChangeStockAutoValueUsecaseInterface } from "../../../domain/usecases";
import { StockAutoRepositoryInterface } from "../../../domain/repository";
import { StockAutoNotFoundError } from "../_errors";

export class ChangeStockAutoValueUsecase implements ChangeStockAutoValueUsecaseInterface {

    constructor(
        private readonly stockAutoRepository: StockAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) {}

    async execute({ stockAutoId, value }: ChangeStockAutoValueUsecaseInterface.InputDto): Promise<ChangeStockAutoValueUsecaseInterface.OutputDto> {

        const stockAutoEntity = await this.stockAutoRepository.findById(stockAutoId)
        if (!stockAutoEntity) return left([new StockAutoNotFoundError()])

        stockAutoEntity.changeValue(value)

        await this.stockAutoRepository.update(stockAutoEntity)

        const stockAutoValueChangedEvent = new StockAutoValueChangedEvent({
            stockAutoId: stockAutoEntity.id,
            value: stockAutoEntity.getValue()
        })

        await this.eventEmitter.emit(stockAutoValueChangedEvent)


        return right(null)
    }
}