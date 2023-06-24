import { StockItemManualRepositoryInterface } from "../../domain/repositories";
import { StockItemManualFacadeInterface } from "../../facades";

export class StockItemManualFacadeImp implements StockItemManualFacadeInterface {
    
    constructor(
        private readonly stockItemManualRepository: StockItemManualRepositoryInterface
    ){}
    
    async consultStockAvailability(announceItemId: string): Promise<number | null> {
        const stockItemManualRepository = await this.stockItemManualRepository.findByAnnounceItemId(announceItemId)
        if(!stockItemManualRepository) return null
        return stockItemManualRepository.getCurrentStock()
    }
    

}