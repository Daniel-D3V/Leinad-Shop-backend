import { left, right } from "@/modules/@shared/logic";
import { InitializeStockItemNormalUsecaseInterface } from "../../../../domain/usecases";
import { StockItemNormalRepositoryInterface } from "../../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockItemNormalEntity } from "@/modules/stock/_base";
import { StockItemNormalInitializedEvent } from "./stock-item-normal-initialized.event";
import { StockItemNormalAlreadyInitializedError } from "./errors";

export class InitializeStockItemNormalUsecase implements InitializeStockItemNormalUsecaseInterface {

    constructor(
        private readonly stockItemNormalRepository: StockItemNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ stockItemId }: InitializeStockItemNormalUsecaseInterface.InputDto): Promise<InitializeStockItemNormalUsecaseInterface.OutputDto> {
        
        const stockItemNormalEntity = StockItemNormalEntity.create({
            stockItemId: stockItemId,
            stock: 0
        }) 
        if(stockItemNormalEntity.isLeft()) return left(stockItemNormalEntity.value)

        const stockItemNormalFound = await this.stockItemNormalRepository.findByStockItemId(stockItemId)
        if(stockItemNormalFound) return left([ new StockItemNormalAlreadyInitializedError() ])

        await this.stockItemNormalRepository.create(stockItemNormalEntity.value)

        const stockItemNormalInitializedEvent = new StockItemNormalInitializedEvent({
            ...stockItemNormalEntity.value.toJSON()
        })
        await this.eventEmitter.emit(stockItemNormalInitializedEvent)

        return right({
            id: stockItemNormalEntity.value.id
        })
    }
}