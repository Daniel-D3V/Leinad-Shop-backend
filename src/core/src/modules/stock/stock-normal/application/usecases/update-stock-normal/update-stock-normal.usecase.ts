
import { Either, left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockNormalUpdatedEvent } from "./stock-normal-updated.event";
import { StockNormalRepositoryInterface } from "../../../domain/repositories";
import { UpdateStockNormalUsecaseInterface } from "../../../domain/usecases";
import { StockNormalNotFoundError } from "../_errors";

export class UpdateStockNormalUsecase implements UpdateStockNormalUsecaseInterface {

    constructor(
        private readonly stockNormalRepository: StockNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ newStock, stockNormalId }: UpdateStockNormalUsecaseInterface.InputDto): Promise<UpdateStockNormalUsecaseInterface.OutputDto> {


        const stockNormalEntity = await this.stockNormalRepository.findById(stockNormalId)
        if (!stockNormalEntity) return left([ new StockNormalNotFoundError() ])

        const updateStockValid = stockNormalEntity.updateStock(newStock)
        if (updateStockValid.isLeft()) return left(updateStockValid.value)

        await this.stockNormalRepository.update(stockNormalEntity)

        const stockNormalUpdatedEvent = new StockNormalUpdatedEvent({
            stockNormalId: stockNormalEntity.id,
            newStock: stockNormalEntity.getCurrentStock()
        })
        await this.eventEmitter.emit(stockNormalUpdatedEvent)

        return right(null)
    }
}