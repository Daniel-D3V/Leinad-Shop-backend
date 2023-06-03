import { EventEmitterInterface } from "@/modules/@shared/events";
import { Either, left, right } from "@/modules/@shared/logic";
import { StockAutoAddedEvent } from "./stock-auto-added.event";
import { StockAutoRepositoryInterface } from "../../../domain/repository";
import { AddStockAutoUsecaseInterface } from "../../../domain/usecases";
import { StockAutoEntity } from "../../../domain/entities";

export class AddStockAutoUsecase implements AddStockAutoUsecaseInterface {

    constructor(
        private readonly stockAutoRepository: StockAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ value, announceId }: AddStockAutoUsecaseInterface.InputDto): Promise<AddStockAutoUsecaseInterface.OutputDto> {

        const stockAutoEntity = StockAutoEntity.create({
            value,
            announceId
        })
        if (stockAutoEntity.isLeft()) return left(stockAutoEntity.value)

        await this.stockAutoRepository.create(stockAutoEntity.value)

        const stockAutoAddedEvent = new StockAutoAddedEvent({
            id: stockAutoEntity.value.id,
            value: stockAutoEntity.value.getValue()
        })
        await this.eventEmitter.emit(stockAutoAddedEvent)

        return right({
            id: stockAutoEntity.value.id
        })
    }
}