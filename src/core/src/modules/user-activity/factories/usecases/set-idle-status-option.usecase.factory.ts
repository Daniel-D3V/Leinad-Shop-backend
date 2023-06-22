import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { SetIdleStatusOptionUsecaseInterface  } from "../../domain/usecases";
import {  SetIdleStatusOptionUsecase } from "../../application/usecases";
import { PrismaUserActivityRepository } from "../../infra/repositories";

export class SetIdleStatusOptionUsecaseFactory {

    static create(): SetIdleStatusOptionUsecaseInterface {

        const execute = async (input: SetIdleStatusOptionUsecaseInterface.InputDto): Promise<SetIdleStatusOptionUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaUserActivityRepository = new PrismaUserActivityRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const setIdleStatusOptionUsecase = new SetIdleStatusOptionUsecase(
                    prismaUserActivityRepository,
                     outboxEmitter
                )
                return await setIdleStatusOptionUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}