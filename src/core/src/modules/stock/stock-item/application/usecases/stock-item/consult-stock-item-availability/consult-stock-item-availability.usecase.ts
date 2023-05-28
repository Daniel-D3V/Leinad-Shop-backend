import { left, right } from "@/modules/@shared/logic";
import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
import { ConsultStockItemAutoAvailabilityUsecaseInterface, ConsultStockItemAvailabilityUsecaseInterface, ConsultStockItemNormalAvailabilityUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
import { StockItemNotFoundError } from "../_errors";


export class ConsultStockItemAvailabilityUsecase implements ConsultStockItemAvailabilityUsecaseInterface {

    constructor(
        private readonly stockItemRepository: StockItemRepositoryInterface,
        private readonly consultStockItemNormalUsecase: ConsultStockItemNormalAvailabilityUsecaseInterface,
        private readonly consultStockItemAutoUsecase: ConsultStockItemAutoAvailabilityUsecaseInterface
    ){}

    async execute({ stockItemId }: ConsultStockItemAvailabilityUsecaseInterface.InputDto): Promise<ConsultStockItemAvailabilityUsecaseInterface.OutputDto> {
    
        const stockItemEntity = await this.stockItemRepository.findById(stockItemId)
        if(!stockItemEntity) return left([ new StockItemNotFoundError() ])

        let stock: number = 0

        if(stockItemEntity.isStockTypeNormal()){
            const consultResult = await this.consultStockItemNormalUsecase.execute({
                stockItemId
            })
            if(consultResult.isRight()) {
                stock = consultResult.value
            }
        }else {
            const consultResult = await this.consultStockItemAutoUsecase.execute({
                stockItemId
            })
            if(consultResult.isRight()) {
                stock = consultResult.value
            }
        }

        return right(stock)
    }
}