import { PrismaClient, StockNormalManagement } from "@prisma/client";
import { StockNormalManagementRepositoryInterface } from "../../../domain/repositories";
import { StockNormalManagementEntity } from "../../../domain/entities";

class PrismaStockNormalManagementMapper {

    static toDomain(prismaStockNormalManagemet: StockNormalManagement): StockNormalManagementEntity {
        const stockManagementEntity = StockNormalManagementEntity.create({
            announceNormalId: prismaStockNormalManagemet.announceNormalId
        },prismaStockNormalManagemet.id)

        if (prismaStockNormalManagemet.stockType === "AUTO") stockManagementEntity.toStockAuto()
        if (prismaStockNormalManagemet.stockType === "NORMAL") stockManagementEntity.toStockNormal()
        return stockManagementEntity
    }
}

export class PrismaStockNormalManagementRepository implements StockNormalManagementRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ) { }
    
    async create(stockEntity: StockNormalManagementEntity): Promise<void> {
        await this.prismaClient.stockNormalManagement.create({
            data: {
                ...stockEntity.toJSON()
            }
        })
    }

    async findByAnnounceNormalId(announceNormalId: string): Promise<StockNormalManagementEntity | null> {
         const prismaStockManagement = await this.prismaClient.stockNormalManagement.findFirst({
            where: { announceNormalId: announceNormalId ?? "" }
        })
        if (!prismaStockManagement) return null
        return PrismaStockNormalManagementMapper.toDomain(prismaStockManagement)
    }

    async findById(id: string): Promise<StockNormalManagementEntity | null> {
        const prismaStockManagement = await this.prismaClient.stockNormalManagement.findFirst({
            where: { id: id ?? "" }
        })
        if (!prismaStockManagement) return null
        return PrismaStockNormalManagementMapper.toDomain(prismaStockManagement)
    }

    async update(stockEntity: StockNormalManagementEntity): Promise<void> {
         await this.prismaClient.stockNormalManagement.updateMany({
            where: { id: stockEntity.id ?? "" },
            data: {
                stockType: stockEntity.stockType
            }
        })
    }
    

}