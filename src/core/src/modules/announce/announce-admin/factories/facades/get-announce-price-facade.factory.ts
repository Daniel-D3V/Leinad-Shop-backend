import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { GetAnnouncePriceFacadeInterface } from "../../facades";

export class GetAnnouncePriceFacadeFactory {
    static create(): GetAnnouncePriceFacadeInterface {
        return {
            execute: async (announceId: string): Promise<number | undefined> => {
                const prismaAnnounce = await prismaClient.announce.findFirst({
                    where: { id: announceId ?? ""}
                })
                return prismaAnnounce?.price ?? undefined
            }
        }
    }
}