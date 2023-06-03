import { left, right } from "@/modules/@shared/logic";
import { StockNormalAlreadyCreatedError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockNormalInitializedEvent } from "./stock-normal-initialized.event"
import { InitializeStockNormalUsecaseInterface } from "../../../domain/usecases";
import { StockNormalRepositoryInterface } from "../../../domain/repositories";
import { StockNormalEntity } from "../../../domain/entities";

export class InitializeStockNormalUsecase implements InitializeStockNormalUsecaseInterface {

    constructor(
        private readonly stockNormalRepository: StockNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ announceId }: InitializeStockNormalUsecaseInterface.InputDto): Promise<InitializeStockNormalUsecaseInterface.OutputDto> {

        const stockNormalEntity = StockNormalEntity.create({
            announceId,
            stock: 0
        })
        if(stockNormalEntity.isLeft()) return left(stockNormalEntity.value)

        const stockNormalAlreadyExists = await this.stockNormalRepository.findByAnnounceId(announceId)
        if (stockNormalAlreadyExists) return left([new StockNormalAlreadyCreatedError()])

        await this.stockNormalRepository.create(stockNormalEntity.value)

        const stockNormalInitializedEvent = new StockNormalInitializedEvent({
            id: stockNormalEntity.value.id,
            stock: stockNormalEntity.value.getCurrentStock(),
            announceId: stockNormalEntity.value.announceId,
        })
        await this.eventEmitter.emit(stockNormalInitializedEvent)

        return right(null)
    }
}