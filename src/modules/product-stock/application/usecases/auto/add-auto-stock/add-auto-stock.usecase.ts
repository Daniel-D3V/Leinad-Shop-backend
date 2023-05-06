import { UsecaseInterface } from "@/modules/@shared/domain";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { Either, left, right } from "@/modules/@shared/logic";
import { ProductStockAutoEntity } from "@/modules/product-stock/domain/entities";
import { ProductStockAutoRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { AddAutoStockInputDto, AddAutoStockOutputDto } from "./add-auto-stock.dto";
import { ProductStockAutoAddedEvent } from "./product-stock-auto-added.event";

export class AddAutoStockUsecase implements UsecaseInterface {

    constructor(
        private readonly productStockAutoRepository: ProductStockAutoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ value }: AddAutoStockInputDto): Promise<Either<Error[], AddAutoStockOutputDto>> {

        const productStockAutoEntity = ProductStockAutoEntity.create({
            value
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