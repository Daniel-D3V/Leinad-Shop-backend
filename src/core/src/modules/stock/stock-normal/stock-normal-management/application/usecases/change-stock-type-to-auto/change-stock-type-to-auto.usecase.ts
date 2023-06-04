import { left, right } from "@/modules/@shared/logic";
import {  ChangeStockTypeToAutoUsecaseInterface} from "@/modules/stock/stock-management/domain/usecases";
import { StockManagementAlreadyIsAutoError, StockManagementNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockTypeChangedToAutoEvent } from "./stock-type-changed-to-auto.event";
import { StockManagementRepositoryInterface } from "../../../domain/repositories/stock-normal-management.repository";

export class ChangeStockTypeToAutoUsecase implements ChangeStockTypeToAutoUsecaseInterface {

    constructor(
        private readonly stockManagementRepository: StockManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ stockManagementId }: ChangeStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockTypeToAutoUsecaseInterface.OutputDto> {

        const stockManagementEntity = await this.stockManagementRepository.findById(stockManagementId)
        if (!stockManagementEntity) return left([new StockManagementNotFoundError()])

        if (stockManagementEntity.isStockAuto()) return left([new StockManagementAlreadyIsAutoError()])

        stockManagementEntity.toStockAuto()

        await this.stockManagementRepository.update(stockManagementEntity)

        const stockTypeChangedToAutoEvent = new StockTypeChangedToAutoEvent({
            id: stockManagementEntity.id
        })
        await this.eventEmitter.emit(stockTypeChangedToAutoEvent)

        return right(null)
    }
}