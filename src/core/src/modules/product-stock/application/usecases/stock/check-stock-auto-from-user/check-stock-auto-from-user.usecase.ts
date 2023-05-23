import { left, right } from "@/modules/@shared/logic";
import { ProductStockAutoRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { CheckStockAutoFromUserUsecaseInterface } from "@/modules/product-stock/domain/usecases";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ProductStockAutoNotFoundError, ProductStockNotFoundError } from "../../_errors";

export class CheckStockAutoFromUserUsecase implements CheckStockAutoFromUserUsecaseInterface {

    constructor(
        private readonly productStockAutoRepository: ProductStockAutoRepositoryInterface,
        private readonly productStockRepository: ProductStockAutoRepositoryInterface
    ){}

    async execute({ productStockAutoId, userId }: CheckStockAutoFromUserUsecaseInterface.InputDto): Promise<CheckStockAutoFromUserUsecaseInterface.OutputDto> {
        
        const productStockAuto = await this.productStockAutoRepository.findById(productStockAutoId)
        if(!productStockAuto) return left([ new ProductStockAutoNotFoundError() ])

        const productStock = await this.productStockRepository.findById(productStockAuto.productStockId)
        if(!productStock) return left([ new ProductStockNotFoundError() ])

        return right(true)
    }
}