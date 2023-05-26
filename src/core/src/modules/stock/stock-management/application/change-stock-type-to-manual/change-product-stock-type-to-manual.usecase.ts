import { left, right } from "@/modules/@shared/logic";
import { ProductStockRepositoryInterface } from "@/modules/stock/domain/repositories";
import { ProductStockAlreadyIsManualError, ProductStockNotFoundError } from "../../../_base/_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockTypeChangedToManualEvent } from "./stock-type-changed-to-manual.event";
import { ChangeStockTypeToManualUsecaseInterface } from "@/modules/stock/stock-management/domain/usecases"

export class ChangeStockTypeToManualUsecase implements ChangeStockTypeToManualUsecaseInterface {

    constructor(
        private readonly productStockRepository: ProductStockRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ productStockId }: ChangeStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeStockTypeToManualUsecaseInterface.OutputDto> {

        const productStockEntity = await this.productStockRepository.findById(productStockId)
        if (!productStockEntity) return left([new ProductStockNotFoundError()])

        if (productStockEntity.isStockNormal()) return left([new ProductStockAlreadyIsManualError()])

        productStockEntity.toStockNormal()

        await this.productStockRepository.update(productStockEntity)

        const stockTypeChangedToManualEvent = new StockTypeChangedToManualEvent({
            productStockId: productStockEntity.id
        })
        await this.eventEmitter.emit(stockTypeChangedToManualEvent)

        return right(null)
    }
}