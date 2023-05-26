import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { CheckStockAutoFromUserUsecase } from "@/modules/stock/application/usecases"
import { PrismaProductStockRepository } from "@/modules/stock/infra/repositories"
import { CheckProductStockFromUserUsecase } from "@/modules/stock/application/usecases"
import { CheckProductStockFromUserUsecaseInterface } from "@/modules/stock/domain/usecases"

export class CheckProductStockFromUserUsecaseFactory {

    static create(): CheckProductStockFromUserUsecaseInterface {

        const execute = async (input: CheckProductStockFromUserUsecaseInterface.InputDto) => {
            const prismaProductStockRepository = new PrismaProductStockRepository(prismaClient)
            const checkProductStockFromUserRepository = new CheckProductStockFromUserUsecase(prismaProductStockRepository)
            return await checkProductStockFromUserRepository.execute(input)
        }
        return {
            execute
        }
    }
}