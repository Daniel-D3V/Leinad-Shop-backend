import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { ChangeAnnounceNormalStockTypeToManualUsecaseInterface } from "../../domain/usecases";
import { ChangeAnnounceNormalStockTypeToManualUsecase } from "../../application/usecases";
import { PrismaAnnounceNormalRepository } from "../../infra/repositories";

export class ChangeAnnounceNormalStockTypeToManualUsecaseFactory {

    static create(): ChangeAnnounceNormalStockTypeToManualUsecaseInterface {

        const execute = async (input: ChangeAnnounceNormalStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeAnnounceNormalStockTypeToManualUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaAnnounceNormalRepository = new PrismaAnnounceNormalRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const changeAnnounceNormalStockTypeToManualUsecase = new ChangeAnnounceNormalStockTypeToManualUsecase(
                    prismaAnnounceNormalRepository,
                     outboxEmitter
                    )
                return await changeAnnounceNormalStockTypeToManualUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}