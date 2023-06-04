import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { CreateStockItemManagementUsecaseInterface } from "@/modules/stock/stock-item/stock-item-management/domain/usecases";
import { StockItemCreatedEvent } from "./stock-item-management-created.event";
import { StockItemAlreadyCreatedError } from "./errors";
import { StockItemManagementRepositoryInterface } from "../../../domain/repositories";
import { StockItemManagementEntity } from "../../../domain/entities";


export class CreateStockItemManagementUsecase implements CreateStockItemManagementUsecaseInterface {

    constructor(
        private readonly stockItemManagementRepository: StockItemManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceItemId }: CreateStockItemManagementUsecaseInterface.InputDto): Promise<CreateStockItemManagementUsecaseInterface.OutputDto> {
        
        const stockItemEntity = StockItemManagementEntity.create({
            announceItemId
        })
        if(stockItemEntity.isLeft()) return left(stockItemEntity.value)

        await this.stockItemManagementRepository.create(stockItemEntity.value)

        const stockItemCreatedEvent = new StockItemCreatedEvent({
            ...stockItemEntity.value.toJSON()
        })
        await this.eventEmitter.emit(stockItemCreatedEvent)

        return right({
            id: stockItemCreatedEvent.id
        })
    }
}