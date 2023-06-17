import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateAnnounceNormalUsecaseInterface } from "../../domain/usecases";
import { CreateAnnounceNormalUsecase } from "../../application/usecases";
import { PrismaAnnounceNormalRepository } from "../../infra/repositories";

export class CreateAnnounceNormalUsecaseFactory {

    static create(): CreateAnnounceNormalUsecaseInterface {

        const execute = async (input: CreateAnnounceNormalUsecaseInterface.InputDto): Promise<CreateAnnounceNormalUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceNormalRepository = new PrismaAnnounceNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createAnnounceNormalUsecase = new CreateAnnounceNormalUsecase(
                    prismaAnnounceNormalRepository,
                     outboxEmitter
                    )
                return await createAnnounceNormalUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}