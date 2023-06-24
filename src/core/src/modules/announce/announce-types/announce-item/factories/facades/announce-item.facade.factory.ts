import { PrismaClient } from "@prisma/client";
import { AnnounceItemFacadeInterface } from "../../facades";
import { AnnounceItemFacadeImp } from "../../infra/facades";
import { PrismaAnnounceItemRepository } from "../../infra/repositories";
import { StockItemManualFacadeFactory } from "@/modules/stock/stock-item/stock-item-manual/factories";
import { StockItemAutoFacadeFactory } from "@/modules/stock/stock-item/stock-item-auto/factories";

export class AnnounceItemFacadeFactory {

    static create(prismaClient: PrismaClient): AnnounceItemFacadeInterface {

        const prismaAnnounceItemRepository = new PrismaAnnounceItemRepository(prismaClient)
        const stockItemManualFacade = StockItemManualFacadeFactory.create(prismaClient)
        const stockItemAutoFacade = StockItemAutoFacadeFactory.create(prismaClient) 
        const announceItemFacadeImp = new AnnounceItemFacadeImp(
            prismaAnnounceItemRepository,
            stockItemManualFacade,
            stockItemAutoFacade
        )
        return announceItemFacadeImp
    }
}