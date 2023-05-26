import { left, right } from "@/modules/@shared/logic";
import { StockNormalAlreadyCreatedError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockNormalCreatedEvent } from "./stock-normal-created.event"
import { CreateNormalStockUsecaseInterface } from "../../../domain/usecases";
import { StockNormalRepositoryInterface } from "../../../domain/repositories";
import { StockNormalEntity } from "../../../domain/entities";

export class CreateProductStockNormalUsecase implements CreateNormalStockUsecaseInterface {

    constructor(
        private readonly stockNormalRepository: StockNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ announceId }: CreateNormalStockUsecaseInterface.InputDto): Promise<CreateNormalStockUsecaseInterface.OutputDto> {

        const stockNormalEntity = StockNormalEntity.create({
            announceId,
            stock: 0
        })
        if(stockNormalEntity.isLeft()) return left(stockNormalEntity.value)

        const stockNormalAlreadyExists = await this.stockNormalRepository.findByAnnounceId(announceId)
        if (stockNormalAlreadyExists) return left([new StockNormalAlreadyCreatedError()])

        await this.stockNormalRepository.create(stockNormalEntity.value)

        const stockNormalCreatedEvent = new StockNormalCreatedEvent({
            id: stockNormalEntity.value.id,
            stock: stockNormalEntity.value.getCurrentStock(),
            announceId: stockNormalEntity.value.announceId,
        })
        await this.eventEmitter.emit(stockNormalCreatedEvent)

        return right(null)
    }
}