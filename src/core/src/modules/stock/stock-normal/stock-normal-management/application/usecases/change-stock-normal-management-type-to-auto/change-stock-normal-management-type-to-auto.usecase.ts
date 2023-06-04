import { left, right } from "@/modules/@shared/logic";
import { StockManagementAlreadyIsAutoError, StockManagementNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { StockNormalManagementRepositoryInterface } from "../../../domain/repositories";
import { ChangeStockNormalManagementTypeToAutoUsecaseInterface } from "../../../domain/usecases";
import { StockNormalManagementTypeChangedToAutoEvent } from "./stock-normal-management-type-changed-to-auto.event";

export class ChangeStockNormalManagementTypeToAutoUsecase implements ChangeStockNormalManagementTypeToAutoUsecaseInterface {

    constructor(
        private readonly stockNormalManagementRepository: StockNormalManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ stockNormalManagementId }: ChangeStockNormalManagementTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockNormalManagementTypeToAutoUsecaseInterface.OutputDto> {

        const stockManagementEntity = await this.stockNormalManagementRepository.findById(stockNormalManagementId)
        if (!stockManagementEntity) return left([new StockManagementNotFoundError()])

        if (stockManagementEntity.isStockAuto()) return left([new StockManagementAlreadyIsAutoError()])

        stockManagementEntity.toStockAuto()

        await this.stockNormalManagementRepository.update(stockManagementEntity)

        const stockNormalManagementTypeChangedToAutoEvent = new StockNormalManagementTypeChangedToAutoEvent({
            stockNormalManagementId: stockManagementEntity.id
        })
        await this.eventEmitter.emit(stockNormalManagementTypeChangedToAutoEvent)

        return right(null)
    }
}