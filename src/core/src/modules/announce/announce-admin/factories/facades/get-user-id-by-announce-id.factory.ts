import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { GetUserIdByAnnounceIdFacadeInterface } from "../../facades";

export class GetUserIdByAnnounceIdFacadeFactory {
    static create(): GetUserIdByAnnounceIdFacadeInterface {
        return {
            execute: async (announceId: string): Promise<string | undefined> => {

                const prismaAnnounce = await prismaClient.announce.findFirst({
                    where: { id: announceId ?? ""},
                    select: { userId: true }
                })
                return prismaAnnounce?.userId ?? undefined
            }
        }
    }
}