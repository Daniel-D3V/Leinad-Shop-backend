import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import {   CheckAnnounceFromUserUsecaseInterface, } from "../../domain/usecases"
import { CheckAnnounceFromUserUsecase } from "../../application/usecases"
import { PrismaAnnounceRepository } from "../../infra/repositories"

export class CheckAnnounceFromUserUsecaseFactory {

    static create(): CheckAnnounceFromUserUsecaseInterface {

        const execute = async (input: CheckAnnounceFromUserUsecaseInterface.InputDto) => {
            const prismaAnnounceRepository = new PrismaAnnounceRepository(prismaClient)
            const checkAnnounceFromUserUsecase = new CheckAnnounceFromUserUsecase(prismaAnnounceRepository)
            return await checkAnnounceFromUserUsecase.execute(input)
        }
        return {
            execute
        }
    }
}