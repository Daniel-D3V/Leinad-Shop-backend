import { left, right } from "@/modules/@shared/logic";
import { InitializeStockManagementUsecaseInterface } from "../../../domain/usecases";
import { StockManagementEntity } from "../../../domain/entities";
import { StockManagementRepositoryInterface } from "../../../domain/repositories";
import { StockManagementAlreadyExistsError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockManagementInitializedEvent } from "./stock-management-initialized.event";


export class InitializeStockManagementUsecase implements InitializeStockManagementUsecaseInterface {

    constructor(
        private readonly stockManagementRepository: StockManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }


    async execute({ announceId }: InitializeStockManagementUsecaseInterface.InputDto): Promise<InitializeStockManagementUsecaseInterface.OutputDto> {
        
        const stockManagementEntity = StockManagementEntity.create({
            announceId
        })
        const stockManagementAlreadyExists = await this.stockManagementRepository.findByAnnounceId(announceId)
        if(stockManagementAlreadyExists) return left([ new StockManagementAlreadyExistsError() ])
        
        await this.stockManagementRepository.create(stockManagementEntity)

        const stockManagementInitializedEvent = new StockManagementInitializedEvent({
            ...stockManagementEntity.toJSON()
        })
        await this.eventEmitter.emit(stockManagementInitializedEvent)

        return right({
            id: stockManagementEntity.id
        })
    }
}