import { PrismaClient } from "@prisma/client";
import { AnnounceFacadeInterface } from "../../facades";


export class AnnounceFacadeFactory {

    static create(prismaClient: PrismaClient): AnnounceFacadeInterface {
        throw new Error("Method not implemented.")
    }
}