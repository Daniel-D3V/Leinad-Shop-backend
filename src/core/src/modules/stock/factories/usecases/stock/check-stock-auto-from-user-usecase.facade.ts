import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { CheckStockAutoFromUserUsecase } from "@/modules/stock/application/usecases"
import { PrismaProductStockAutoRepository } from "@/modules/stock/infra/repositories"
import { CheckStockAutoFromUserUsecaseInterface } from "@/modules/stock/domain/usecases"

export class CheckStockAutoFromUserUsecaseFactory {

    static create(): CheckStockAutoFromUserUsecaseInterface {

        const execute = async (input: CheckStockAutoFromUserUsecaseInterface.InputDto) => {

            const prismaProductStockAutoRepository = new PrismaProductStockAutoRepository(prismaClient)
            const checkStockAutoFromUserUsecase = new CheckStockAutoFromUserUsecase(prismaProductStockAutoRepository)
            return await checkStockAutoFromUserUsecase.execute(input)
        }
        return {
            execute
        }
    }
}