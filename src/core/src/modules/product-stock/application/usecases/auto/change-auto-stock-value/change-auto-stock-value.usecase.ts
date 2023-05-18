import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { ChangeAutoStockValueInputDto, ChangeAutoStockValueOutputDto } from "./change-auto-stock-value.dto";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ProductStockAutoRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { ProductStockNotFoundError } from "../../_errors";
import { ProductStockAutoValueChangedEvent } from "./product-stock-auto-value-changed.event";

export class ChangeAutoStockValueUsecase implements UsecaseInterface{

    constructor(
        private readonly productStockAutoRepository: ProductStockAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ productStockId, value }: ChangeAutoStockValueInputDto): Promise<Either<Error[], ChangeAutoStockValueOutputDto>> {

        const productStockAutoEntity = await this.productStockAutoRepository.findById(productStockId)
        if(!productStockAutoEntity) return left([ new ProductStockNotFoundError() ])

        productStockAutoEntity.changeValue(value)

        await this.productStockAutoRepository.update(productStockAutoEntity)

        const productStockAutoValueChangedEvent = new ProductStockAutoValueChangedEvent({
            productStockId: productStockAutoEntity.id,
            value: productStockAutoEntity.getValue()
        })

        await this.eventEmitter.emit(productStockAutoValueChangedEvent)


        return right(null)
    }
}