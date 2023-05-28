import { left, right } from "@/modules/@shared/logic";
import {  ChangeStockTypeToAutoUsecaseInterface} from "@/modules/stock/stock-management/domain/usecases";
import { ProductStockAlreadyIsAutoError, ProductStockAlreadyIsItemError, ProductStockNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockTypeChangedToItemEvent } from "./stock-type-changed-to-item.event";
import { StockManagementRepositoryInterface } from "../../../domain/repositories/stock-management.repository";

export class ChangeStockTypeToItemUsecase implements ChangeStockTypeToAutoUsecaseInterface {

    constructor(
        private readonly stockManagementRepository: StockManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ stockManagementId }: ChangeStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockTypeToAutoUsecaseInterface.OutputDto> {

        const stockManagementEntity = await this.stockManagementRepository.findById(stockManagementId)
        if (!stockManagementEntity) return left([new ProductStockNotFoundError()])

        if (stockManagementEntity.isStockItem()) return left([new ProductStockAlreadyIsItemError()])

        stockManagementEntity.toStockItem()

        await this.stockManagementRepository.update(stockManagementEntity)

        const stockTypeChangedToItemEvent = new StockTypeChangedToItemEvent({
            id: stockManagementEntity.id
        })
        await this.eventEmitter.emit(stockTypeChangedToItemEvent)

        return right(null)
    }
}