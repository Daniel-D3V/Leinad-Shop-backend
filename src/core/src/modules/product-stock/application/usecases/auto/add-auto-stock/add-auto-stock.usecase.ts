import { UsecaseInterface } from "@/modules/@shared/domain";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { Either, left, right } from "@/modules/@shared/logic";
import { ProductStockAutoEntity } from "@/modules/product-stock/domain/entities";
import { ProductStockAutoRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { ProductStockAutoAddedEvent } from "./product-stock-auto-added.event";
import { AddAutoStockUsecaseInterface } from "@/modules/product-stock/domain/usecases";

export class AddAutoStockUsecase implements AddAutoStockUsecaseInterface {

    constructor(
        private readonly productStockAutoRepository: ProductStockAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ value, productStockId }: AddAutoStockUsecaseInterface.InputDto): Promise<AddAutoStockUsecaseInterface.OutputDto> {

        const productStockAutoEntity = ProductStockAutoEntity.create({
            value,
            productStockId
        })
        if(productStockAutoEntity.isLeft()) return left(productStockAutoEntity.value)

        await this.productStockAutoRepository.create(productStockAutoEntity.value)

        const productStockAutoAddedEvent = new ProductStockAutoAddedEvent({
            productStockId: productStockAutoEntity.value.id,
            value: productStockAutoEntity.value.getValue()
        })
        await this.eventEmitter.emit(productStockAutoAddedEvent)

        return right(null)
    }
}