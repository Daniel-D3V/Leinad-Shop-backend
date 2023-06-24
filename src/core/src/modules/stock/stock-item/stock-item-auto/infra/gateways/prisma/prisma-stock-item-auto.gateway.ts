import { PrismaClient } from "@prisma/client";
import { StockItemAutoGatewayInterface } from "../../../domain/gateways";


export class PrismaStockItemAutoGateway implements StockItemAutoGatewayInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async cosultStockAvailability(announceNormalId: string): Promise<number | null> {
        
        const stockItemAuto = await this.prismaClient.stockItemAuto.findFirst({
            where: { announceItemId: announceNormalId ?? "" },
        })
        if(!stockItemAuto) return null

        return await this.prismaClient.stockItemAuto.count({
            where: { announceItemId: announceNormalId ?? "" },
            
        })
    }

}