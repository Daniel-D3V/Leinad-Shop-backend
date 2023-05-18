import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { DeleteAutoStockInputDto, DeleteAutoStockOutputDto } from "./delete-auto-stock.dto";
import { ProductStockAutoRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ProductStockAutoDeletedEvent } from "./product-stock-auto-deleted.event";

export class DeleteAutoStockUsecase implements UsecaseInterface {
    
    constructor(
        private readonly productStockAutoRepository: ProductStockAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}
    
    async execute({ productStockId }: DeleteAutoStockInputDto): Promise<Either<Error[], DeleteAutoStockOutputDto>> {

        await this.productStockAutoRepository.delete(productStockId)

        const productStockAutoDeletedEvent = new ProductStockAutoDeletedEvent({
            productStockId: productStockId
        })

        await this.eventEmitter.emit(productStockAutoDeletedEvent)

        return right(null)
    }
}