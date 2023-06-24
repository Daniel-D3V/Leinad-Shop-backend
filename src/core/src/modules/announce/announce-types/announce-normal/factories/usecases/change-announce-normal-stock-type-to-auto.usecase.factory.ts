import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeAnnounceNormalStockTypeToAutoUsecaseInterface } from "../../domain/usecases";
import { ChangeAnnounceNormalStockTypeToAutoUsecase, CreateAnnounceNormalUsecase } from "../../application/usecases";
import { PrismaAnnounceNormalRepository } from "../../infra/repositories";

export class ChangeAnnounceNormalStockTypeToAutoUsecaseFactory {

    static create(): ChangeAnnounceNormalStockTypeToAutoUsecaseInterface {

        const execute = async (input: ChangeAnnounceNormalStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeAnnounceNormalStockTypeToAutoUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceNormalRepository = new PrismaAnnounceNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceNormalStockTypeToAutoUsecase = new ChangeAnnounceNormalStockTypeToAutoUsecase(
                    prismaAnnounceNormalRepository,
                     outboxEmitter
                    )
                return await changeAnnounceNormalStockTypeToAutoUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}