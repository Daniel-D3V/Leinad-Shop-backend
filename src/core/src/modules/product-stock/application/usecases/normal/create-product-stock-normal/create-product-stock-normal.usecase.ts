import { left, right } from "@/modules/@shared/logic";
import { ProductStockNormalRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { CreateProductStockNormalUsecaseInterface } from "@/modules/product-stock/domain/usecases/normal";
import { ProductStockNotFoundError } from "../../_errors";
import { ProductStockNormalEntity } from "@/modules/product-stock/domain/entities";
import { ProductStockNormalAlreadyCreatedError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import {  ProductStockNormalCreatedEvent } from "./product-stock-normal-created.event"

export class CreateProductStockNormalUsecase implements CreateProductStockNormalUsecaseInterface {
    
    constructor(
        private readonly productStockRepository: ProductStockNormalRepositoryInterface,
        private readonly productStockNormalRepository: ProductStockNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ productStockId }: CreateProductStockNormalUsecaseInterface.InputDto): Promise<CreateProductStockNormalUsecaseInterface.OutputDto> {
        

        const productStockEntity = ProductStockNormalEntity.create({
            stock: 0
        }, productStockId)
        if(productStockEntity.isLeft()) return left(productStockEntity.value)

        const productStock = await this.productStockRepository.findById(productStockId)
        if(!productStock) return left([ new ProductStockNotFoundError() ])

        const productStockNormal = await this.productStockNormalRepository.findById(productStockEntity.value.id)
        if(productStockNormal) return left([ new ProductStockNormalAlreadyCreatedError() ])

        await this.productStockNormalRepository.create(productStockEntity.value)

        const productStockNormalCreatedEvent = new ProductStockNormalCreatedEvent({
            id: productStockEntity.value.id,
            stock: productStockEntity.value.getCurrentStock()
        })
        await this.eventEmitter.emit(productStockNormalCreatedEvent)

        return right(null)
    }
}