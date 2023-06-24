import { PrismaClient } from "@prisma/client";
import { AnnounceNormalFacadeInterface } from "../../facades";
import { AnnounceNormalFacadeImp } from "../../infra/facades";
import { PrismaAnnounceNormalRepository } from "../../infra/repositories";
import { StockNormalManualFacadeFactory } from "@/modules/stock/stock-normal/stock-normal-manual/factories";
import { StockNormalAutoFacadeFactory } from "@/modules/stock/stock-normal/stock-normal-auto/factories";

export class AnnounceNormalFacadeFactory {

    static create(prismaClient: PrismaClient): AnnounceNormalFacadeInterface {

        const stockNormalManualFacade = StockNormalManualFacadeFactory.create(prismaClient)
        const stockNormalAutoFacade = StockNormalAutoFacadeFactory.create(prismaClient)
        const prismaAnnounceNormalRepository = new PrismaAnnounceNormalRepository(prismaClient)
        const announceNormalFacadeImp = new AnnounceNormalFacadeImp(
            prismaAnnounceNormalRepository,
            stockNormalManualFacade,
            stockNormalAutoFacade
        )
        return announceNormalFacadeImp
    }
}