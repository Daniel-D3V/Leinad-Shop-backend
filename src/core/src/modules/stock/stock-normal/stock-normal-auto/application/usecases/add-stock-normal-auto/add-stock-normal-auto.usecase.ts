import { EventEmitterInterface } from "@/modules/@shared/events";
import { Either, left, right } from "@/modules/@shared/logic";
import {  StockNormalAutoAddedEvent } from "./stock-normal-auto-added.event";
import { StockNormalAutoRepositoryInterface } from "../../../domain/repository";
import { AddStockNormalAutoUsecaseInterface } from "../../../domain/usecases";
import { StockNormalAutoEntity } from "../../../domain/entities";

export class AddStockNormalAutoUsecase implements AddStockNormalAutoUsecaseInterface {

    constructor(
        private readonly stockNormalAutoRepository: StockNormalAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute(input: AddStockNormalAutoUsecaseInterface.InputDto): Promise<AddStockNormalAutoUsecaseInterface.OutputDto> {

        const stockNormalAutoEntity = StockNormalAutoEntity.create({
            ...input
        })
        if (stockNormalAutoEntity.isLeft()) return left(stockNormalAutoEntity.value)

        await this.stockNormalAutoRepository.create(stockNormalAutoEntity.value)

        const stockNormalAutoAddedEvent = new StockNormalAutoAddedEvent({
            ...stockNormalAutoEntity.value.toJSON()
        })
        await this.eventEmitter.emit(stockNormalAutoAddedEvent)

        return right({
            id: stockNormalAutoEntity.value.id
        })
    }
}