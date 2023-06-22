import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { SetStatusOfflineUsecaseInterface  } from "../../domain/usecases";
import {  SetStatusOfflineUsecase } from "../../application/usecases";
import { PrismaUserActivityRepository } from "../../infra/repositories";

export class SetStatusOfflineUsecaseFactory {

    static create(): SetStatusOfflineUsecaseInterface {

        const execute = async (input: SetStatusOfflineUsecaseInterface.InputDto): Promise<SetStatusOfflineUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaUserActivityRepository = new PrismaUserActivityRepository(prisma as PrismaClient)
                const setStatusOfflineUsecase = new SetStatusOfflineUsecase(
                    prismaUserActivityRepository
                )
                return await setStatusOfflineUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}