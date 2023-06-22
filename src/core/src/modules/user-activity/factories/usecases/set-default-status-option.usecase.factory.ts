import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { SetDefaultStatusOptionUsecaseInterface  } from "../../domain/usecases";
import {  SetDefaultStatusOptionUsecase } from "../../application/usecases";
import { PrismaUserActivityRepository } from "../../infra/repositories";

export class SetDefaultStatusOptionUsecaseFactory {

    static create(): SetDefaultStatusOptionUsecaseInterface {

        const execute = async (input: SetDefaultStatusOptionUsecaseInterface.InputDto): Promise<SetDefaultStatusOptionUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaUserActivityRepository = new PrismaUserActivityRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const setDefaultStatusOptionUsecase = new SetDefaultStatusOptionUsecase(
                    prismaUserActivityRepository,
                     outboxEmitter
                )
                return await setDefaultStatusOptionUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}