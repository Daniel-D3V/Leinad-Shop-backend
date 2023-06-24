import { StockItemAutoGatewayInterface } from "../../domain/gateways";
import { StockItemAutoFacadeInterface } from "../../facades";


export class StockItemAutoFacadeImp implements StockItemAutoFacadeInterface {
    
    constructor(
        private readonly stockItemAutoGateway: StockItemAutoGatewayInterface
    ){}
    
    async cosultStockAvailability(announceNormalId: string): Promise<number | null> {
        return await this.stockItemAutoGateway.cosultStockAvailability(announceNormalId)
    }


}