import { Either, left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockAutoNormalValueChangedEvent } from "./stock-normal-auto-value-changed.event";
import { ChangeStockNormalAutoValueUsecaseInterface } from "../../../domain/usecases";
import { StockNormalAutoRepositoryInterface } from "../../../domain/repository";
import { StockAutoNotFoundError } from "../_errors";

export class ChangeStockNormalAutoValueUsecase implements ChangeStockNormalAutoValueUsecaseInterface {

    constructor(
        private readonly stockNormalAutoRepository: StockNormalAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) {}

    async execute({ stockNormalAutoId, value }: ChangeStockNormalAutoValueUsecaseInterface.InputDto): Promise<ChangeStockNormalAutoValueUsecaseInterface.OutputDto> {

        const stockAutoEntity = await this.stockNormalAutoRepository.findById(stockNormalAutoId)
        if (!stockAutoEntity) return left([new StockAutoNotFoundError()])

        stockAutoEntity.changeValue(value)

        await this.stockNormalAutoRepository.update(stockAutoEntity)

        const stockAutoNormalValueChangedEvent = new StockAutoNormalValueChangedEvent({
            stockNormalAutoId: stockAutoEntity.id,
            value: stockAutoEntity.getValue()
        })

        await this.eventEmitter.emit(stockAutoNormalValueChangedEvent)


        return right(null)
    }
}