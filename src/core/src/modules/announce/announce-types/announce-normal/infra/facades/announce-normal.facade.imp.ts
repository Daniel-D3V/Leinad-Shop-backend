import { StockNormalAutoFacadeInterface } from "@/modules/stock/stock-normal/stock-normal-auto/facades";
import { AnnounceNormalEntity } from "../../domain/entities";
import { AnnounceNormalRepositoryInterface } from "../../domain/repositories";
import { AnnounceNormalFacadeInterface } from "../../facades";
import { StockNormalManualFacadeInterface } from "@/modules/stock/stock-normal/stock-normal-manual/facades";

export class AnnounceNormalFacadeImp implements AnnounceNormalFacadeInterface {
    
    constructor(
        private readonly announceNormalRepository: AnnounceNormalRepositoryInterface,
        private readonly stockNormalManualFacade: StockNormalManualFacadeInterface,
        private readonly stockNormalAutoFacade: StockNormalAutoFacadeInterface
    ){}

    async getAnnounceNormalDetails(announceNormalId: string): Promise<AnnounceNormalFacadeInterface.AnnounceItemModel | null> {
        const announceNormalEntity = await this.announceNormalRepository.findById(announceNormalId)
        if(!announceNormalEntity) return null

        const stockAvailability = await this.consultStockAvailability(announceNormalId, announceNormalEntity.stockType)
        if(!stockAvailability) return null

        return {
            announceNormalId: announceNormalEntity.id,
            stockType: announceNormalEntity.stockType,
            price: announceNormalEntity.getPrice(),
            stockAvailable: stockAvailability
        }

    }

    async consultStockAvailability(announceNormalId: string, stockType: AnnounceNormalEntity.StockType): Promise<number | null> {
        if(stockType === "MANUAL"){
            return await this.stockNormalManualFacade.cosultStockAvailability(announceNormalId)
        }
        if(stockType === "AUTO"){
            return await this.stockNormalAutoFacade.cosultStockAvailability(announceNormalId)
        }

        return null
    }
}