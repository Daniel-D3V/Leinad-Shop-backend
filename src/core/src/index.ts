

interface HelperFunctions {
    getStockTypeByAnnounceId(announceId: string): Promise<string | undefined>
    calculateStockAuto(announceId: string): Promise<number>
    calculateStockNormal(announceId: string): Promise<number>
    calculateStockItem(announceId: string, itemId: string): Promise<number>
}

type Props = {
    announceId: string
    itemId: string
}

type PlaceOrderInputDto = {
    customerId: string 
    products: Pick<Props, "announceId" | "announceId">
}

type ConsultStockType = Pick<Props, "announceId"> & Partial<Props> 


interface StockManagementFacade {
    consultStock(props: ConsultStockType): Promise<number>
}


class StockManagementFacadeImp implements StockManagementFacade {
    
    constructor(
        private readonly helperFunctions: HelperFunctions
    ){}

    async consultStock({ announceId, itemId }: ConsultStockType): Promise<number> {
        
        const stockType = await this.helperFunctions.getStockTypeByAnnounceId(announceId)
        if(stockType === undefined) return 0

        let stock: number = 0
        switch(stockType){

            case "AUTO": {
                stock = await this.helperFunctions.calculateStockAuto(announceId)
                break
            }
            case "NORMAL": {
                stock = await this.helperFunctions.calculateStockNormal(announceId)
                break
            }
            case "ITEM": {
                if(itemId === undefined) return 0
                stock = await this.helperFunctions.calculateStockItem(announceId, itemId)
                break
            }

            default: {
                stock = await this.helperFunctions.calculateStockAuto(announceId)
                break
            }
        }

        return stock
    }

}

