import { PrismaClient } from "@prisma/client"
import { StockNormalAutoGatewayInterface } from "../../../domain/gateways"

export class PrismaStockNormalAutoGateway implements StockNormalAutoGatewayInterface {
    constructor(
        private readonly prismaClient: PrismaClient
    ){}
    
    async consultStockAvailability(announceNormalId: string): Promise<number | null> {
        const announceNormal = await this.prismaClient.announceNormal.findUnique({
            where: {
                id: announceNormalId
            }
        })
        if(!announceNormal) return null
        
        return await this.prismaClient.stockNormalAuto.count({
            where: { announceNormalId: announceNormal.id ?? "" }
        })
    }
}