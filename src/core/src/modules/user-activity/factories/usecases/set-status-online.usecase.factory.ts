import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { SetStatusOnlineUsecaseInterface  } from "../../domain/usecases";
import {  SetStatusOnlineUsecase } from "../../application/usecases";
import { PrismaUserActivityRepository } from "../../infra/repositories";

export class SetStatusOnlineUsecaseFactory {

    static create(): SetStatusOnlineUsecaseInterface {

        const execute = async (input: SetStatusOnlineUsecaseInterface.InputDto): Promise<SetStatusOnlineUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaUserActivityRepository = new PrismaUserActivityRepository(prisma as PrismaClient)
                const setStatusOnlineUsecase = new SetStatusOnlineUsecase(
                    prismaUserActivityRepository
                )
                return await setStatusOnlineUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}