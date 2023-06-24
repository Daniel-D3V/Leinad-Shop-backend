import { PrismaClient } from "@prisma/client";
import { AnnounceFacadeInterface } from "../../facades";
import { AnnounceFacadeImp } from "../../infra/facades";
import { PrismaAnnounceManagementRepository } from "../../infra/repositories";
import { AnnounceNormalFacadeFactory } from "@/modules/announce/announce-types/announce-normal/factories/facades";
import { AnnounceItemFacadeFactory } from "@/modules/announce/announce-types/announce-item/factories/facades";


export class AnnounceFacadeFactory {

    static create(prismaClient: PrismaClient): AnnounceFacadeInterface {
        const prismaAnnounceManagementRepository = new PrismaAnnounceManagementRepository(prismaClient)
        const announceNormalFacade = AnnounceNormalFacadeFactory.create(prismaClient)
        const announceItemFacade = AnnounceItemFacadeFactory.create(prismaClient)
        const announceFacadeImp = new AnnounceFacadeImp(
            prismaAnnounceManagementRepository,
            announceNormalFacade,
            announceItemFacade
        )
        return announceFacadeImp
    }
}