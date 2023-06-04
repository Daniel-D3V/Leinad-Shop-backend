// import { PrismaClient } from "@prisma/client";
// import { StockAutoRepositoryInterface } from "../../../domain/repository";
// import { StockAutoEntity } from "../../../domain/entities";

// export class PrismaStockAutoRepository implements StockAutoRepositoryInterface {

//     constructor(
//         private readonly prismaClient: PrismaClient
//     ) { }

//     async findById(id: string): Promise<StockAutoEntity | null> {
//         const prismaProductStockAuto = await this.prismaClient.stockAuto.findFirst({
//             where: { id: id ?? "" }
//         })
//         if (!prismaProductStockAuto) return null

//         const stockAutoEntity = StockAutoEntity.create({
//             announceId: prismaProductStockAuto.announceId,
//             value: prismaProductStockAuto.value
//         }, prismaProductStockAuto.id)
//         if (stockAutoEntity.isLeft()) throw stockAutoEntity.value[0]
//         return stockAutoEntity.value
//     }
//     async create(stockAutoEntity: StockAutoEntity): Promise<void> {
//             await this.prismaClient.stockAuto.create({
//                 data: {
//                     ...stockAutoEntity.toJSON()
//                 }
//             })
//     }
//     async delete(id: string): Promise<void> {
//         await this.prismaClient.stockAuto.deleteMany({
//             where: { id: id ?? "" }
//         })
//     }
//     async update(stockAutoEntity: StockAutoEntity): Promise<void> {
//         await this.prismaClient.stockAuto.updateMany({
//             where: { id: stockAutoEntity.id ?? "" },
//             data: {
//                 ...stockAutoEntity.toJSON()
//             }
//         })
//     }

//     // async findById(id: string): Promise<ProductStockAutoEntity | null> {
//     //     const prismaproductStockAuto = await this.prismaClient.productStockAuto.findFirst({
//     //         where: { id: id ?? "" }
//     //     })
//     //     if (!prismaproductStockAuto) return null

//     //     const productStockAutoEntity = ProductStockAutoEntity.create({
//     //         productStockId: prismaproductStockAuto.announceId,
//     //         value: prismaproductStockAuto.value
//     //     }, prismaproductStockAuto.id)
//     //     if (productStockAutoEntity.isLeft()) throw productStockAutoEntity.value[0]
//     //     return productStockAutoEntity.value
//     // }
//     // async create(productStockAutoEntity: ProductStockAutoEntity): Promise<void> {
//     //     const { productStockId, ...props } = productStockAutoEntity.toJSON()
//     //     await this.prismaClient.productStockAuto.create({
//     //         data: {
//     //             ...props,
//     //             announceId: productStockId
//     //         }
//     //     })
//     // }
//     // async delete(id: string): Promise<void> {
//     //     await this.prismaClient.productStockAuto.deleteMany({
//     //         where: { id: id ?? "" }
//     //     })
//     // }
//     // async update(productStockAutoEntity: ProductStockAutoEntity): Promise<void> {
//     //     const { productStockId, ...props } = productStockAutoEntity.toJSON()
//     //     await this.prismaClient.productStockAuto.updateMany({
//     //         where: { id: productStockAutoEntity.id ?? "" },
//     //         data: {
//     //             ...props,
//     //             announceId: productStockId
//     //         }
//     //     })
//     // }

// }