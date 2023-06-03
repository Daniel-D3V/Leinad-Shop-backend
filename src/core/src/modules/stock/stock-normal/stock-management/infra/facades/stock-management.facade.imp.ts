import { StockManagementFacadeInterface } from "../../facades";
import { StockManagementRepositoryInterface } from "../../domain/repositories";
import { StockNormalFacadeInterface } from "@/modules/stock/stock-normal/facades";
import { StockAutoFacadeInterface } from "@/modules/stock/stock-auto/facades";
import { StockItemFacadeInterface } from "@/modules/stock/stock-item/facades";

export class StockManagementFacadeImp implements StockManagementFacadeInterface {
    
    constructor(
        private readonly stockManagementRepository: StockManagementRepositoryInterface,
        private readonly stockNormalFacade: StockNormalFacadeInterface,
        private readonly stockAutoFacade: StockAutoFacadeInterface,
        private readonly stockItemFacade: StockItemFacadeInterface
    ){}

    async consultStock({ announceId, itemId }: StockManagementFacadeInterface.ConsultStockInput): Promise<number> {
        
        const stockManagementEntity = await this.stockManagementRepository.findByAnnounceId(announceId)
        if(!stockManagementEntity) return 0

        let stock: number = 0

        if(stockManagementEntity.isStockAuto()){
            stock = await this.stockAutoFacade.consultStockByAnnounceId(announceId)
        }
        else if(stockManagementEntity.isStockItem()){
            if(!itemId) return 0
            stock = await this.stockItemFacade.consultStock(itemId)
        }else {
            stock = await this.stockNormalFacade.consultStockByAnnounceId(announceId)
        }
        return stock
    }
}


