import { StockNormalAutoGatewayInterface } from "../../domain/gateways";
import { StockNormalAutoFacadeInterface } from "../../facades";


export class StockNormalAutoFacade implements StockNormalAutoFacadeInterface {
    
    constructor(
        private readonly stockNormalAutoGateway: StockNormalAutoGatewayInterface
    ){}
    
    async cosultStockAvailability(announceNormalId: string): Promise<number | null> {
        return await this.stockNormalAutoGateway.consultStockAvailability(announceNormalId)
    }


}