import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { UpdateNormalStockInputDto, UpdateNormalStockOutputDto } from "./update-normal-stock.dto";
import { ProductStockNormalRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { ProductStockNotFoundError } from "../../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ProductStockNormalUpdatedEvent } from "./product-stock-normal-updated.event";

export class updateNormalStockUsecase implements UsecaseInterface{

    constructor(
        private readonly productStockNormalRepository: ProductStockNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ newStock, productStockId }: UpdateNormalStockInputDto): Promise<Either<Error[], UpdateNormalStockOutputDto>> {

        const productStockNormalEntity = await this.productStockNormalRepository.findById(productStockId)
        if(!productStockNormalEntity) return left([ new ProductStockNotFoundError() ])

        const updateStockValid = productStockNormalEntity.updateStock(newStock)
        if(updateStockValid.isLeft()) return left(updateStockValid.value)

        await this.productStockNormalRepository.update(productStockNormalEntity)

        const productStockNormalUpdatedEvent = new ProductStockNormalUpdatedEvent({
            productStockId: productStockNormalEntity.id,
            newStock: productStockNormalEntity.getCurrentStock()
        })
        await this.eventEmitter.emit(productStockNormalUpdatedEvent)

        return right(null)
    }
}