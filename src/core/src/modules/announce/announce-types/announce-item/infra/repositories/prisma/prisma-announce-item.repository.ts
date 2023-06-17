import { PrismaClient } from "@prisma/client";
import { AnnounceItemEntity } from "../../../domain/entities";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";


export class PrismaAnnounceItemRepository implements AnnounceItemRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}
    
    async create(announceItem: AnnounceItemEntity): Promise<void> {
        await this.prismaClient.announceItem.create({
            data: {
                ...announceItem.toJSON()
            }
        })
    }


}