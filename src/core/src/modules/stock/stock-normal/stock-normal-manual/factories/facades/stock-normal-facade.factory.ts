// import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
// import { StockNormalFacadeInterface } from "../../facades"
// import { StockNormalFacadeImp } from "../../infra/facades"
// import { ConsultStockNormalAvailabilityByAnnounceIdUsecase } from "../../application/usecases"
// import { PrismaStockNormalRepository } from "../../infra/repositories"
// import { PrismaClient } from "@prisma/client"


// export class StockNormalFacadeFactory {

//     static create(providedPrisma?: PrismaClient): StockNormalFacadeInterface {

//         const prismaUse = providedPrisma ?? prismaClient
//         const prismaStockNormalRepository = new PrismaStockNormalRepository(prismaUse)
//         const consultStockNormalAvailabilityByAnnounceIdUsecase = new ConsultStockNormalAvailabilityByAnnounceIdUsecase(prismaStockNormalRepository)
//         const stockNormalFacadeImp = new StockNormalFacadeImp(consultStockNormalAvailabilityByAnnounceIdUsecase)
//         return stockNormalFacadeImp
//     }
// }