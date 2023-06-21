import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaClient } from "@prisma/client";
import { MarkNotificationAsReadUsecaseInterface,  } from "../../domain/usecases";
import { MarkNotificationAsReadUsecase } from "../../application/usecases";
import { PrismaNotificationRepository } from "../../infra/repositories";

export class MarkNotificationAsReadUsecaseFactory {

    static create(): MarkNotificationAsReadUsecaseInterface {

        const execute = async (input: MarkNotificationAsReadUsecaseInterface.InputDto): Promise<MarkNotificationAsReadUsecaseInterface.OutputDto> => {

            return await prismaClient.$transaction(async (prisma) => {
                const prismaNotificationRepository = new PrismaNotificationRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const markNotificationAsReadUsecase = new MarkNotificationAsReadUsecase(
                    prismaNotificationRepository,
                     outboxEmitter
                )
                return await markNotificationAsReadUsecase.execute(input)
            })
        }

        return {
            execute
        }
    }
}