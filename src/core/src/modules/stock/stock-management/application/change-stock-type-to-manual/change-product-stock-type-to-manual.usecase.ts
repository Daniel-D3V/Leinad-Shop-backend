import { left, right } from "@/modules/@shared/logic";
import { ProductStockAlreadyIsManualError, ProductStockNotFoundError } from "../../../_base/_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockTypeChangedToManualEvent } from "./stock-type-changed-to-manual.event";
import { ChangeStockTypeToManualUsecaseInterface } from "@/modules/stock/stock-management/domain/usecases"
import { StockManagementRepositoryInterface } from "../../domain/repositories";

export class ChangeStockTypeToManualUsecase implements ChangeStockTypeToManualUsecaseInterface {

    constructor(
        private readonly stockManagementRepository: StockManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ productStockId }: ChangeStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeStockTypeToManualUsecaseInterface.OutputDto> {

        const stockManagementEntity = await this.stockManagementRepository.findById(productStockId)
        if (!stockManagementEntity) return left([new ProductStockNotFoundError()])

        if (stockManagementEntity.isStockNormal()) return left([new ProductStockAlreadyIsManualError()])

        stockManagementEntity.toStockNormal()

        await this.stockManagementRepository.update(stockManagementEntity)

        const stockTypeChangedToManualEvent = new StockTypeChangedToManualEvent({
            productStockId: stockManagementEntity.id
        })
        await this.eventEmitter.emit(stockTypeChangedToManualEvent)

        return right(null)
    }
}