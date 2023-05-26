import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { ProductStockAutoRepositoryInterface } from "@/modules/stock/domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ProductStockAutoDeletedEvent } from "./product-stock-auto-deleted.event";
import { DeleteAutoStockUsecaseInterface } from "@/modules/stock/domain/usecases";

export class DeleteAutoStockUsecase implements DeleteAutoStockUsecaseInterface {

    constructor(
        private readonly productStockAutoRepository: ProductStockAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ productStockAutoId }: DeleteAutoStockUsecaseInterface.InputDto): Promise<DeleteAutoStockUsecaseInterface.OutputDto> {

        await this.productStockAutoRepository.delete(productStockAutoId)

        const productStockAutoDeletedEvent = new ProductStockAutoDeletedEvent({
            productStockAutoId
        })

        await this.eventEmitter.emit(productStockAutoDeletedEvent)

        return right(null)
    }
}