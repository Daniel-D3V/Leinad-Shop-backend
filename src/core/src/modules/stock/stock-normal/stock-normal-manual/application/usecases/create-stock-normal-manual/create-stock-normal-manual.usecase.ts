import { left, right } from "@/modules/@shared/logic";
import { StockManualAlreadyCreatedError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { CreateStockNormalManualUsecaseInterface } from "../../../domain/usecases";
import { StockNormalManualRepositoryInterface } from "../../../domain/repositories";
import { StockNormalManualEntity } from "../../../domain/entities";
import { StockNormalManualCreatedEvent } from "./stock-normal-manual-created.event";


export class CreateStockNormalManualUsecase implements CreateStockNormalManualUsecaseInterface {

    constructor(
        private readonly stockManualRepository: StockNormalManualRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute(input: CreateStockNormalManualUsecaseInterface.InputDto): Promise<CreateStockNormalManualUsecaseInterface.OutputDto> {

        const stockNormalManualEntity = StockNormalManualEntity.create({
            ...input
        })
        if(stockNormalManualEntity.isLeft()) return left(stockNormalManualEntity.value)

        const stockManualAlreadyExists = await this.stockManualRepository.findByAnnounceNormalId(input.announceNormalId)
        if (stockManualAlreadyExists) return left([new StockManualAlreadyCreatedError()])

        await this.stockManualRepository.create(stockNormalManualEntity.value)

        const stockNormalManualCreatedEvent = new StockNormalManualCreatedEvent({
            ...stockNormalManualEntity.value.toJSON()
        })
        await this.eventEmitter.emit(stockNormalManualCreatedEvent)

        return right({
            id: stockNormalManualEntity.value.id
        })
    }
}