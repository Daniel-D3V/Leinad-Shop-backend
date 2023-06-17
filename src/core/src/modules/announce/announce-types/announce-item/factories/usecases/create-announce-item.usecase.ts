import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateAnnounceItemUsecaseInterface } from "../../domain/usecases";
import { CreateAnnounceItemUsecase } from "../../application/usecases";
import { PrismaAnnounceItemRepository } from "../../infra/repositories";

export class CreateAnnounceItemUsecaseFactory {

    static create(): CreateAnnounceItemUsecaseInterface {

        const execute = async (input: CreateAnnounceItemUsecaseInterface.InputDto): Promise<CreateAnnounceItemUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceItemRepository = new PrismaAnnounceItemRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createAnnounceItemUsecase = new CreateAnnounceItemUsecase(
                    prismaAnnounceItemRepository,
                     outboxEmitter
                    )
                return await createAnnounceItemUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}