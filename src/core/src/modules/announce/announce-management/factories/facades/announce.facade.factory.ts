import { PrismaClient } from "@prisma/client";
import { AnnounceFacadeInterface } from "../../facades";
import { AnnounceFacadeImp } from "../../infra/facades";


export class AnnounceFacadeFactory {

    static create(prismaClient: PrismaClient): AnnounceFacadeInterface {
        const announceFacadeImp = new AnnounceFacadeImp()
        return announceFacadeImp
    }
}