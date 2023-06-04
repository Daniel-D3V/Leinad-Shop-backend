import { left, right } from "@/modules/@shared/logic";
import { StockManualAlreadyCreatedError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { CreateStockManualUsecaseInterface } from "../../../domain/usecases";
import { StockManualRepositoryInterface } from "../../../domain/repositories";
import { StockManualEntity } from "../../../domain/entities";
import { StockManualCreatedEvent } from "./stock-manual-created.event";


export class CreateStockManualUsecase implements CreateStockManualUsecaseInterface {

    constructor(
        private readonly stockManualRepository: StockManualRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ stockManagementId, stock }: CreateStockManualUsecaseInterface.InputDto): Promise<CreateStockManualUsecaseInterface.OutputDto> {

        const stockNormalEntity = StockManualEntity.create({
            stockManagementId,
            stock
        })
        if(stockNormalEntity.isLeft()) return left(stockNormalEntity.value)

        const stockManualAlreadyExists = await this.stockManualRepository.findByStockManagementId(stockManagementId)
        if (stockManualAlreadyExists) return left([new StockManualAlreadyCreatedError()])

        await this.stockManualRepository.create(stockNormalEntity.value)

        const stockManualCreatedEvent = new StockManualCreatedEvent({
            ...stockNormalEntity.value.toJSON()
        })
        await this.eventEmitter.emit(stockManualCreatedEvent)

        return right(null)
    }
}