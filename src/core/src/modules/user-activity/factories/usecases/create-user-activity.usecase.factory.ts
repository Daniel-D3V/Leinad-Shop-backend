import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateUserActivityUsecaseInterface  } from "../../domain/usecases";
import { CreateUserActivityUsecase } from "../../application/usecases";
import { PrismaUserActivityRepository } from "../../infra/repositories";

export class CreateUserActivityUsecaseFactory {

    static create(): CreateUserActivityUsecaseInterface {

        const execute = async (input: CreateUserActivityUsecaseInterface.InputDto): Promise<CreateUserActivityUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaUserActivityRepository = new PrismaUserActivityRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const createUserActivityUsecase = new CreateUserActivityUsecase(
                    prismaUserActivityRepository,
                     outboxEmitter
                )
                return await createUserActivityUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}