import { left, right } from "@/modules/@shared/logic";
import { StockItemNormalRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { ConsultStockItemNormalAvailabilityUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { StockItemNormalNotFoundError } from "../_errors";

export class ConsultStockItemNormalAvailabilityUsecase implements ConsultStockItemNormalAvailabilityUsecaseInterface {

    constructor(
        private readonly stockItemNormalRepository: StockItemNormalRepositoryInterface
    ){}

    async execute({ stockItemId }: ConsultStockItemNormalAvailabilityUsecaseInterface.InputDto): Promise<ConsultStockItemNormalAvailabilityUsecaseInterface.OutputDto> {
        const stockItemNormalEntity = await this.stockItemNormalRepository.findByStockItemId(stockItemId)
        if(!stockItemNormalEntity) return left([ new StockItemNormalNotFoundError() ])
        return right(stockItemNormalEntity.getCurrentStock())
    }
}