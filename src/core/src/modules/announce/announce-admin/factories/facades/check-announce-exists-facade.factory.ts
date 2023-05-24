import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { CheckAnnounceExistsFacadeInterface } from "../../facades";

export class CheckAnnounceExistsFacadeFactory {
    static create(): CheckAnnounceExistsFacadeInterface {
        return {
            execute: async (announceId: string): Promise<boolean> => {
                const prismaAnnounce = await prismaClient.announce.findFirst({
                    where: { id: announceId ?? ""} 
                })
                return !!prismaAnnounce
            }
        }
    }
}