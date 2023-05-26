
import { Either, left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockNormalUpdatedEvent } from "./stock-normal-updated.event";
import { StockNormalRepositoryInterface } from "../../../domain/repositories";
import { UpdateNormalStockUsecaseInterface } from "../../../domain/usecases";
import { StockNormalNotFoundError } from "../_errors";

export class UpdateNormalStockUsecase implements UpdateNormalStockUsecaseInterface {

    constructor(
        private readonly stockNormalRepository: StockNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ newStock, id }: UpdateNormalStockUsecaseInterface.InputDto): Promise<UpdateNormalStockUsecaseInterface.OutputDto> {


        const stockNormalEntity = await this.stockNormalRepository.findById(id)
        if (!stockNormalEntity) return left([ new StockNormalNotFoundError() ])

        const updateStockValid = stockNormalEntity.updateStock(newStock)
        if (updateStockValid.isLeft()) return left(updateStockValid.value)

        await this.stockNormalRepository.update(stockNormalEntity)

        const stockNormalUpdatedEvent = new StockNormalUpdatedEvent({
            id: stockNormalEntity.id,
            newStock: stockNormalEntity.getCurrentStock()
        })
        await this.eventEmitter.emit(stockNormalUpdatedEvent)

        return right(null)
    }
}