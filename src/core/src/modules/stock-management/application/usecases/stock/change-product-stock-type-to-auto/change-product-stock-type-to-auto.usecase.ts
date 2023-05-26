import { left, right } from "@/modules/@shared/logic";
import { ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { ChangeProductStockTypeToAutoUsecaseInterface } from "@/modules/product-stock/domain/usecases";
import { ProductStockAlreadyIsAutoError, ProductStockNotFoundError } from "../../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ProductStockTypeChangedToAutoEvent } from "./product-stock-type-changed-to-auto.event";

export class ChangeProductStockTypeToAutoUsecase implements ChangeProductStockTypeToAutoUsecaseInterface {

    constructor(
        private readonly productStockRepository: ProductStockRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ productStockId }: ChangeProductStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeProductStockTypeToAutoUsecaseInterface.OutputDto> {
        
        const productStockEntity = await this.productStockRepository.findById(productStockId)
        if(!productStockEntity) return left([ new ProductStockNotFoundError() ])

        if(productStockEntity.isStockAuto()) return left([ new ProductStockAlreadyIsAutoError() ])

        productStockEntity.toStockAuto()

        await this.productStockRepository.update(productStockEntity)

        const productStockTypeChangedToAutoEvent = new ProductStockTypeChangedToAutoEvent({
            productStockId: productStockEntity.id
        })
        await this.eventEmitter.emit(productStockTypeChangedToAutoEvent)

        return right(null)
    }
}