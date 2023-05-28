import { right } from "@/modules/@shared/logic";
import { StockItemAutoGatewayInterface } from "@/modules/stock/stock-item/domain/gateways";
import { ConsultStockItemAutoAvailabilityUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";


export class ConsultStockItemAutoAvailabilityUsecase implements ConsultStockItemAutoAvailabilityUsecaseInterface {

    constructor(
        private readonly stockItemAutoGateway: StockItemAutoGatewayInterface
    ){}    

    async execute({ stockItemId }: ConsultStockItemAutoAvailabilityUsecaseInterface.InputDto): Promise<ConsultStockItemAutoAvailabilityUsecaseInterface.OutputDto> {
        const stockItemAutoCount = await this.stockItemAutoGateway.getStockItemAutoCount(stockItemId)
        return right(stockItemAutoCount)
    }
}