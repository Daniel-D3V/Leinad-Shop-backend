import { StockNormalManualRepositoryInterface } from "../../../domain/repositories";
import { StockNormalManualFacadeInterface } from "../../../facades";


export class StockNormalManualFacadeImp implements StockNormalManualFacadeInterface {
    
    constructor(
        private readonly stockNormalManualRepository: StockNormalManualRepositoryInterface
    ){}

    async cosultStockAvailability(announceNormalId: string): Promise<number | null> {
        const announceNormalManualEntity = await this.stockNormalManualRepository.findByAnnounceNormalId(announceNormalId)
        if(!announceNormalManualEntity) return null
        return announceNormalManualEntity.getCurrentStock()
    }
  

}