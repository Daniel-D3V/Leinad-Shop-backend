

import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeAnnounceNormalPriceUsecaseInterface } from "../../domain/usecases";
import { ChangeAnnounceNormalPriceUsecase, CreateAnnounceNormalUsecase } from "../../application/usecases";
import { PrismaAnnounceNormalRepository } from "../../infra/repositories";

export class ChangeAnnounceNormalPriceUsecaseFactory {

    static create(): ChangeAnnounceNormalPriceUsecaseInterface {

        const execute = async (input: ChangeAnnounceNormalPriceUsecaseInterface.InputDto): Promise<ChangeAnnounceNormalPriceUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceNormalRepository = new PrismaAnnounceNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceNormalPriceUsecase = new ChangeAnnounceNormalPriceUsecase(
                    prismaAnnounceNormalRepository,
                     outboxEmitter
                    )
                return await changeAnnounceNormalPriceUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}