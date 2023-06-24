import { StockItemAutoFacadeInterface } from "@/modules/stock/stock-item/stock-item-auto/facades";
import { AnnounceItemEntity } from "../../domain/entities";
import { AnnounceItemRepositoryInterface } from "../../domain/repositories";
import { AnnounceItemFacadeInterface } from "../../facades";
import { StockItemManualFacadeInterface } from "@/modules/stock/stock-item/stock-item-manual/facades";


export class AnnounceItemFacadeImp implements AnnounceItemFacadeInterface {

    constructor(
        private readonly announceItemRepository: AnnounceItemRepositoryInterface,
        private readonly stockItemManualFacade: StockItemManualFacadeInterface,
        private readonly stockItemAutoFacade: StockItemAutoFacadeInterface
    ){}

    async getAnnounceItemDetails(announceItemId: string): Promise<AnnounceItemFacadeInterface.AnnounceItemModel | null> {
        
        const announceItemEntity = await this.announceItemRepository.findById(announceItemId)
        if(!announceItemEntity) return null

        const stockAvailability = await this.consultStockAvailability(announceItemId, announceItemEntity.stockType)
        if(stockAvailability === null) return null

        return {
            announceItemId: announceItemEntity.id,
            stockType: announceItemEntity.stockType,
            price: announceItemEntity.getPrice(),
            stockAvailable: stockAvailability
        }
    }

    async consultStockAvailability(announceItemId: string, stockType: AnnounceItemEntity.StockType): Promise<number | null> {

        if(stockType === "MANUAL"){
            return await this.stockItemManualFacade.consultStockAvailability(announceItemId)
        }
        if(stockType === "AUTO"){
            return await this.stockItemAutoFacade.cosultStockAvailability(announceItemId)
        }

        return null
    }

}