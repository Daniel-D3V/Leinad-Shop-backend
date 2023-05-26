
import { Either, left, right } from "@/modules/@shared/logic";
import { ProductStockNormalRepositoryInterface } from "@/modules/stock/domain/repositories";
import { ProductStockNotFoundError } from "../../../../_base/_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ProductStockNormalUpdatedEvent } from "./product-stock-normal-updated.event";
import { UpdateNormalStockUsecaseInterface } from "@/modules/stock/domain/usecases/normal";

export class UpdateNormalStockUsecase implements UpdateNormalStockUsecaseInterface {

    constructor(
        private readonly productStockNormalRepository: ProductStockNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ newStock, productStockId }: UpdateNormalStockUsecaseInterface.InputDto): Promise<UpdateNormalStockUsecaseInterface.OutputDto> {

        const productStockNormalEntity = await this.productStockNormalRepository.findById(productStockId)
        if (!productStockNormalEntity) return left([new ProductStockNotFoundError()])

        const updateStockValid = productStockNormalEntity.updateStock(newStock)
        if (updateStockValid.isLeft()) return left(updateStockValid.value)

        await this.productStockNormalRepository.update(productStockNormalEntity)

        const productStockNormalUpdatedEvent = new ProductStockNormalUpdatedEvent({
            productStockId: productStockNormalEntity.id,
            newStock: productStockNormalEntity.getCurrentStock()
        })
        await this.eventEmitter.emit(productStockNormalUpdatedEvent)

        return right(null)
    }
}