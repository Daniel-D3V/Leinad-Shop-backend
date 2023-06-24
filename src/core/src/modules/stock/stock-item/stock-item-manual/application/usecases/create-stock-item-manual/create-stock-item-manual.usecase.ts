import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemManualRepositoryInterface } from "../../../domain/repositories";
import { CreateStockItemManualUsecaseInterface } from "../../../domain/usecases";
import { StockItemManualEntity } from "../../../domain/entities";
import { left, right } from "@/modules/@shared/logic";
import { StockItemManagementManualAlreadyCreatedError } from "./errors";
import { StockItemManualCreatedEvent } from "./stock-item-manual-created.event";


export class CreateStockItemManualUsecase implements CreateStockItemManualUsecaseInterface {

    constructor(
        private readonly stockItemManualRepository: StockItemManualRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: CreateStockItemManualUsecaseInterface.InputDto): Promise<CreateStockItemManualUsecaseInterface.OutputDto> {
        
        const stockItemManualEntity = StockItemManualEntity.create({
            ...input
        })
        if(stockItemManualEntity.isLeft()) return left(stockItemManualEntity.value)

        const stockItemManagementManualExists = await this.stockItemManualRepository.findByAnnounceItemId(input.announceItemId)
        if(stockItemManagementManualExists) return left([ new StockItemManagementManualAlreadyCreatedError() ])

        await this.stockItemManualRepository.create(stockItemManualEntity.value)

        const stockItemManualCreatedEvent = new  StockItemManualCreatedEvent({
            ...stockItemManualEntity.value.toJSON()
        })

        await this.eventEmitter.emit(stockItemManualCreatedEvent)

        return right({
            id: stockItemManualEntity.value.id
        })
    }
}