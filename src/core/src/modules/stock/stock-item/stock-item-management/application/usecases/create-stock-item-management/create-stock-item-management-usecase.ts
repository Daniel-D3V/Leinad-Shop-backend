import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { CreateStockItemManagementUsecaseInterface } from "@/modules/stock/stock-item/stock-item-management/domain/usecases";
import { StockItemManagementCreatedEvent } from "./stock-item-management-created.event";
import { StockItemManagementRepositoryInterface } from "../../../domain/repositories";
import { StockItemManagementEntity } from "../../../domain/entities";
import { StockItemAlreadyCreatedError } from "./errors";


export class CreateStockItemManagementUsecase implements CreateStockItemManagementUsecaseInterface {

    constructor(
        private readonly stockItemManagementRepository: StockItemManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceItemId }: CreateStockItemManagementUsecaseInterface.InputDto): Promise<CreateStockItemManagementUsecaseInterface.OutputDto> {
        
        const stockItemManagementEntity = StockItemManagementEntity.create({
            announceItemId
        })
        if(stockItemManagementEntity.isLeft()) return left(stockItemManagementEntity.value)
        
        const existingStockItemManagement = await this.stockItemManagementRepository.findByAnnounceItemId(announceItemId)
        if(existingStockItemManagement) return left([ new StockItemAlreadyCreatedError() ])

        await this.stockItemManagementRepository.create(stockItemManagementEntity.value)

        const stockItemManagementCreatedEvent = new StockItemManagementCreatedEvent({
            ...stockItemManagementEntity.value.toJSON()
        })
        await this.eventEmitter.emit(stockItemManagementCreatedEvent)

        return right({
            id: stockItemManagementEntity.value.id
        })
    }
}