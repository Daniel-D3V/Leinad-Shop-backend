import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { LoginUsecase } from "../../application/usecases"
import { LoginUsecaseInterface } from "../../domain/usecases"
import { MongoRefreshTokenRepository, PrismaUserRepository } from "../../infra/repositories"
import { PrismaClient } from "@prisma/client"
import { JwtTokenManagement } from "../../infra/protocols"
import { AuthTokenFacadeFactory } from "../facades"
import { Temporary2faTokenFacadeFactory, TwoFactorAuthenticationFacadeFactory } from "@/modules/auth/2fa/factories"

export class LoginUsecaseFactory {

    static create(): LoginUsecaseInterface {

        const execute = async (input: LoginUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const authTokenFacade = AuthTokenFacadeFactory.create(prisma as PrismaClient)
                const twoFactorAuthenticationFacade = TwoFactorAuthenticationFacadeFactory.create(prisma as PrismaClient)
                const temporary2faTokenFacade = Temporary2faTokenFacadeFactory.create()
                const userRepository = new PrismaUserRepository(prisma as PrismaClient)
                const loginUsecase = new LoginUsecase(
                    userRepository,
                    authTokenFacade,
                    twoFactorAuthenticationFacade,
                    temporary2faTokenFacade
                )
                return await loginUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}