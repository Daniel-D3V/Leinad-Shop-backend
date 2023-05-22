import { left, right } from "@/modules/@shared/logic";
import { ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { ChangeProductStockTypeToAutoUsecaseInterface, ChangeProductStockTypeToManualUsecaseInterface } from "@/modules/product-stock/domain/usecases";
import { ProductStockAlreadyIsAutoError, ProductStockAlreadyIsManualError, ProductStockNotFoundError } from "../../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ProductStockTypeChangedToManualEvent } from "./product-stock-type-changed-to-manual.event";

export class ChangeProductStockTypeToManualUsecase implements ChangeProductStockTypeToManualUsecaseInterface {

    constructor(
        private readonly productStockRepository: ProductStockRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ productStockId }: ChangeProductStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeProductStockTypeToAutoUsecaseInterface.OutputDto> {
        
        const productStockEntity = await this.productStockRepository.findById(productStockId)
        if(!productStockEntity) return left([ new ProductStockNotFoundError() ])

        if(productStockEntity.isStockNormal()) return left([ new ProductStockAlreadyIsManualError() ])

        productStockEntity.toStockNormal()

        await this.productStockRepository.update(productStockEntity)

        const productStockTypeChangedToManualEvent = new ProductStockTypeChangedToManualEvent({
            productStockId: productStockEntity.id
        })
        await this.eventEmitter.emit(productStockTypeChangedToManualEvent)

        return right(null)
    }
}