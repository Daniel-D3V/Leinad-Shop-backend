import { left, right } from "@/modules/@shared/logic";
import { ProductStockNormalRepositoryInterface, ProductStockRepositoryInterface } from "@/modules/stock/domain/repositories";
import { CreateProductStockNormalUsecaseInterface } from "@/modules/stock/domain/usecases/normal";
import { ProductStockNotFoundError } from "../../_errors";
import { ProductStockNormalEntity } from "@/modules/stock/domain/entities";
import { ProductStockNormalAlreadyCreatedError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ProductStockNormalCreatedEvent } from "./product-stock-normal-created.event"

export class CreateProductStockNormalUsecase implements CreateProductStockNormalUsecaseInterface {

    constructor(
        private readonly productStockRepository: ProductStockRepositoryInterface,
        private readonly productStockNormalRepository: ProductStockNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ productStockId }: CreateProductStockNormalUsecaseInterface.InputDto): Promise<CreateProductStockNormalUsecaseInterface.OutputDto> {


        const productStockNormalEntity = ProductStockNormalEntity.create({
            stock: 0
        }, productStockId)
        if (productStockNormalEntity.isLeft()) return left(productStockNormalEntity.value)

        const productStock = await this.productStockRepository.findById(productStockId)
        if (!productStock) return left([new ProductStockNotFoundError()])

        const productStockNormal = await this.productStockNormalRepository.findById(productStockNormalEntity.value.id)
        if (productStockNormal) return left([new ProductStockNormalAlreadyCreatedError()])

        await this.productStockNormalRepository.create(productStockNormalEntity.value)

        const productStockNormalCreatedEvent = new ProductStockNormalCreatedEvent({
            id: productStockNormalEntity.value.id,
            stock: productStockNormalEntity.value.getCurrentStock()
        })
        await this.eventEmitter.emit(productStockNormalCreatedEvent)

        return right(null)
    }
}