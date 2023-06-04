import { left, right } from "@/modules/@shared/logic";
import { InitializeStockNormalManagementUsecaseInterface } from "../../../domain/usecases";
import { StockNormalManagementEntity } from "../../../domain/entities";
import { StockManagementRepositoryInterface } from "../../../domain/repositories";
import { StockNormalManagementAlreadyExistsError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockNormalManagementInitializedEvent } from "./stock-normal-management-initialized.event";


export class InitializeStockNormalManagementUsecase implements InitializeStockNormalManagementUsecaseInterface {

    constructor(
        private readonly stockManagementRepository: StockManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }


    async execute({ announceNormalId }: InitializeStockNormalManagementUsecaseInterface.InputDto): Promise<InitializeStockNormalManagementUsecaseInterface.OutputDto> {
        
        const stockNormalManagementEntity = StockNormalManagementEntity.create({
            announceNormalId
        })
        const stockManagementAlreadyExists = await this.stockManagementRepository.findByAnnounceNormalId(announceNormalId)
        if(stockManagementAlreadyExists) return left([ new StockNormalManagementAlreadyExistsError() ])
        
        await this.stockManagementRepository.create(stockNormalManagementEntity)

        const stockNormalManagementInitializedEvent = new StockNormalManagementInitializedEvent({
            ...stockNormalManagementEntity.toJSON()
        })
        await this.eventEmitter.emit(stockNormalManagementInitializedEvent)

        return right({
            id: stockNormalManagementEntity.id
        })
    }
}