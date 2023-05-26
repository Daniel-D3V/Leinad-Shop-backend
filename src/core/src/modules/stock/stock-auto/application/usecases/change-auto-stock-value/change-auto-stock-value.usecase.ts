import { Either, left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ProductStockAutoRepositoryInterface } from "@/modules/stock/domain/repositories";
import { ProductStockNotFoundError } from "../../_errors";
import { ProductStockAutoValueChangedEvent } from "./product-stock-auto-value-changed.event";
import { ChangeAutoStockValueUsecaseInterface } from "@/modules/stock/domain/usecases";

export class ChangeAutoStockValueUsecase implements ChangeAutoStockValueUsecaseInterface {

    constructor(
        private readonly productStockAutoRepository: ProductStockAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ productStockAutoId, value }: ChangeAutoStockValueUsecaseInterface.InputDto): Promise<ChangeAutoStockValueUsecaseInterface.OutputDto> {

        const productStockAutoEntity = await this.productStockAutoRepository.findById(productStockAutoId)
        if (!productStockAutoEntity) return left([new ProductStockNotFoundError()])

        productStockAutoEntity.changeValue(value)

        await this.productStockAutoRepository.update(productStockAutoEntity)

        const productStockAutoValueChangedEvent = new ProductStockAutoValueChangedEvent({
            productStockAutoId: productStockAutoEntity.id,
            value: productStockAutoEntity.getValue()
        })

        await this.eventEmitter.emit(productStockAutoValueChangedEvent)


        return right(null)
    }
}