import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { GetAnnouncePriceFacadeInterface } from "../../facades";

export class GetAnnouncePriceFacadeFactory {
    static create(): GetAnnouncePriceFacadeInterface {
        return {
            execute: async ({ announceId, announceItemId }: GetAnnouncePriceFacadeInterface.Input): Promise<number | undefined> => {
                
                const prismaStockManagement = await prismaClient.stockManagement.findFirst({
                    where: { id: announceId ?? "" }
                })
                if(prismaStockManagement?.stockType === "ITEM"){
                    const prismaAnnounceItem = await prismaClient.announceItem.findFirst({
                        where: { id: announceItemId ?? "" }
                    })
                    return prismaAnnounceItem?.price ?? undefined
                }
                
                const prismaAnnounce = await prismaClient.announce.findFirst({
                    where: { id: announceId ?? "" }
                })
                return prismaAnnounce?.price ?? undefined
            }
        }
    }
}