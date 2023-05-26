import { left, right } from "@/modules/@shared/logic";
import { CreateStockManagementUsecaseInterface } from "../../../domain/usecases";
import { StockManagementEntity } from "../../../domain/entities";
import { StockManagementRepositoryInterface } from "../../../domain/repositories";
import { StockManagementAlreadyExistsError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockManagementCreatedEvent } from "./stock-management-created.event";


export class CreateStockManagementUsecase implements CreateStockManagementUsecaseInterface {

    constructor(
        private readonly stockManagementRepository: StockManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }


    async execute({ announceId }: CreateStockManagementUsecaseInterface.InputDto): Promise<CreateStockManagementUsecaseInterface.OutputDto> {
        
        const stockManagementEntity = StockManagementEntity.create({
            announceId
        })
        const stockManagementAlreadyExists = await this.stockManagementRepository.findByAnnounceId(announceId)
        if(stockManagementAlreadyExists) return left([ new StockManagementAlreadyExistsError() ])
        
        await this.stockManagementRepository.create(stockManagementEntity)

        const stockManagementCreatedEvent = new StockManagementCreatedEvent({
            ...stockManagementEntity.toJSON()
        })
        await this.eventEmitter.emit(stockManagementCreatedEvent)

        return right({
            id: stockManagementEntity.id
        })
    }
}