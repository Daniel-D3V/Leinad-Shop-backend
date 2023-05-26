import { left, right } from "@/modules/@shared/logic";
import { ProductStockRepositoryInterface } from "@/modules/stock/domain/repositories";
import {  ChangeStockTypeToAutoUsecaseInterface} from "@/modules/stock/stock-management/domain/usecases";
import { ProductStockAlreadyIsAutoError, ProductStockNotFoundError } from "../../../_base/_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockTypeChangedToAutoEvent } from "./stock-type-changed-to-auto.event";

export class ChangeStockTypeToAutoUsecase implements ChangeStockTypeToAutoUsecaseInterface {

    constructor(
        private readonly productStockRepository: ProductStockRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ productStockId }: ChangeStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockTypeToAutoUsecaseInterface.OutputDto> {

        const productStockEntity = await this.productStockRepository.findById(productStockId)
        if (!productStockEntity) return left([new ProductStockNotFoundError()])

        if (productStockEntity.isStockAuto()) return left([new ProductStockAlreadyIsAutoError()])

        productStockEntity.toStockAuto()

        await this.productStockRepository.update(productStockEntity)

        const stockTypeChangedToAutoEvent = new StockTypeChangedToAutoEvent({
            productStockId: productStockEntity.id
        })
        await this.eventEmitter.emit(stockTypeChangedToAutoEvent)

        return right(null)
    }
}