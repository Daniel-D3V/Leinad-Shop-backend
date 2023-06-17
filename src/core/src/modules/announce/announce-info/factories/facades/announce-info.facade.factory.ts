import { PrismaClient } from "@prisma/client";
import { PrismaAnnounceInfoRepository } from "../../infra/repositories";
import { AnnounceInfoFacadeImp } from "../../infra/facades";
import { announceInfoFacadeInterface } from "../../facades";

export class announceInfoFacadeFactory {

    static create(prismaClient: PrismaClient): announceInfoFacadeInterface {
        const prismaAnnounceInfoRepository = new PrismaAnnounceInfoRepository(prismaClient)
        const announceInfoFacadeImp = new AnnounceInfoFacadeImp(prismaAnnounceInfoRepository)
        return announceInfoFacadeImp
    }
}