// import { ConsultStockItemAvailabilityUsecaseInterface } from "../../domain/usecases";
import { StockItemFacadeInterface } from "../../facades";

export class StockItemFacadeImp implements StockItemFacadeInterface {
    
    constructor(
        private readonly consultStockItemAvailability: any
    ){}
    
    async consultStock(itemId: string): Promise<number> {
        const consultResult = await this.consultStockItemAvailability.execute({
            stockItemId: itemId
        })
        if(consultResult.isLeft()) return 0
        return consultResult.value
    }

}