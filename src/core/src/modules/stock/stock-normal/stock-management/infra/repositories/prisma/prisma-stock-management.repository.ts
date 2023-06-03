import { PrismaClient } from "@prisma/client";
import { StockManagementRepositoryInterface } from "../../../domain/repositories";
import { StockManagementEntity } from "../../../domain/entities";

export class PrismaStockManagementRepository implements StockManagementRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ) { }
    
    async create(stockEntity: StockManagementEntity): Promise<void> {
        await this.prismaClient.stockManagement.create({
            data: {
                ...stockEntity.toJSON()
            }
        })
    }

    async findByAnnounceId(announceId: string): Promise<StockManagementEntity | null> {
         const prismaStockManagement = await this.prismaClient.stockManagement.findFirst({
            where: { announceId: announceId ?? "" }
        })
        if (!prismaStockManagement) return null
        const stockManagementEntity = StockManagementEntity.create({
            announceId: prismaStockManagement.announceId
        },prismaStockManagement.id)

        if (prismaStockManagement.stockType === "AUTO") stockManagementEntity.toStockAuto()
        if (prismaStockManagement.stockType === "NORMAL") stockManagementEntity.toStockNormal()
        if (prismaStockManagement.stockType === "ITEM") stockManagementEntity.toStockItem()
        return stockManagementEntity
    }

    async findById(id: string): Promise<StockManagementEntity | null> {
        const prismaStockManagement = await this.prismaClient.stockManagement.findFirst({
            where: { id: id ?? "" }
        })
        if (!prismaStockManagement) return null
        const stockManagementEntity = StockManagementEntity.create({
            announceId: prismaStockManagement.announceId
        },prismaStockManagement.id)

        if (prismaStockManagement.stockType === "AUTO") stockManagementEntity.toStockAuto()
        if (prismaStockManagement.stockType === "NORMAL") stockManagementEntity.toStockNormal()
        if (prismaStockManagement.stockType === "ITEM") stockManagementEntity.toStockItem()
        return stockManagementEntity
    }

    async update(stockEntity: StockManagementEntity): Promise<void> {
         await this.prismaClient.stockManagement.updateMany({
            where: { id: stockEntity.id ?? "" },
            data: {
                stockType: stockEntity.stockType
            }
        })
    }
    

    // async findById(id: string): Promise<ProductStockEntity | null> {
    //     const prismaProductStock = await this.prismaClient.announce.findFirst({
    //         where: { id: id ?? "" }
    //     })
    //     if (!prismaProductStock) return null
    //     const productStockEntity = ProductStockEntity.create(prismaProductStock.id)
    //     if (prismaProductStock.stockType === "AUTO") productStockEntity.toStockAuto()
    //     if (prismaProductStock.stockType === "NORMAL") productStockEntity.toStockNormal()
    //     return productStockEntity
    // }
    // async update(productStockEntity: ProductStockEntity): Promise<void> {
    //     await this.prismaClient.announce.updateMany({
    //         where: { id: productStockEntity.id ?? "" },
    //         data: {
    //             stockType: productStockEntity.stockType
    //         }
    //     })

    // }

}