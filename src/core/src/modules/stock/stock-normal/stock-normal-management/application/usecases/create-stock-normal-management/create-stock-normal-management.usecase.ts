import { left, right } from "@/modules/@shared/logic";
import { CreateStockNormalManagementUsecaseInterface } from "../../../domain/usecases";
import { StockNormalManagementEntity } from "../../../domain/entities";
import { StockNormalManagementRepositoryInterface } from "../../../domain/repositories";
import { StockNormalManagementAlreadyExistsError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockNormalManagementCreatedEvent } from "./stock-normal-management-created.event";


export class CreateStockNormalManagementUsecase implements CreateStockNormalManagementUsecaseInterface {

    constructor(
        private readonly stockNormalManagementRepository: StockNormalManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }


    async execute({ announceNormalId }: CreateStockNormalManagementUsecaseInterface.InputDto): Promise<CreateStockNormalManagementUsecaseInterface.OutputDto> {
        
        const stockNormalManagementEntity = StockNormalManagementEntity.create({
            announceNormalId
        })
        const stockManagementAlreadyExists = await this.stockNormalManagementRepository.findByAnnounceNormalId(announceNormalId)
        if(stockManagementAlreadyExists) return left([ new StockNormalManagementAlreadyExistsError() ])
        
        await this.stockNormalManagementRepository.create(stockNormalManagementEntity)

        const stockNormalManagementCreatedEvent = new StockNormalManagementCreatedEvent({
            ...stockNormalManagementEntity.toJSON()
        })
        await this.eventEmitter.emit(stockNormalManagementCreatedEvent)

        return right({
            id: stockNormalManagementEntity.id
        })
    }
}