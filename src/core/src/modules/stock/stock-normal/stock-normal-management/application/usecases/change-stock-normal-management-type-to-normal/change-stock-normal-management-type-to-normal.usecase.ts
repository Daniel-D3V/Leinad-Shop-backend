import { left, right } from "@/modules/@shared/logic";
import { StockManagementAlreadyIsNormalError, StockManagementNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import {  StockNormalManagementTypeChangedToNormalEvent } from "./stock-normal-management-type-changed-to-normal.event";
import { StockNormalManagementRepositoryInterface } from "../../../domain/repositories";
import { ChangeStockNormalManagementTypeToNormalUsecaseInterface } from "../../../domain/usecases";

export class ChangeStockNormalManagementTypeToNormalUsecase implements ChangeStockNormalManagementTypeToNormalUsecaseInterface {

    constructor(
        private readonly stockNormalManagementRepository: StockNormalManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ stockNormalManagementId }: ChangeStockNormalManagementTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockNormalManagementTypeToNormalUsecaseInterface.OutputDto> {

        const stockManagementEntity = await this.stockNormalManagementRepository.findById(stockNormalManagementId)
        if (!stockManagementEntity) return left([new StockManagementNotFoundError()])

        if (stockManagementEntity.isStockNormal()) return left([new StockManagementAlreadyIsNormalError()])

        stockManagementEntity.toStockNormal()

        await this.stockNormalManagementRepository.update(stockManagementEntity)

        const stockNormalManagementTypeChangedToNormalEvent = new StockNormalManagementTypeChangedToNormalEvent({
            stockNormalManagementId: stockManagementEntity.id
        })
        await this.eventEmitter.emit(stockNormalManagementTypeChangedToNormalEvent)

        return right(null)
    }
}