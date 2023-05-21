import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { LoginUsecase } from "../../application/usecases"
import { LoginUsecaseInterface } from "../../domain/usecases"
import { MongoRefreshTokenRepository, PrismaUserRepository } from "../../infra/repositories"
import {  PrismaClient } from "@prisma/client"
import { JwtTokenManagement } from "../../infra/protocols"

export class LoginUsecaseFactory {

    static create(): LoginUsecaseInterface {

        const execute = async (input: LoginUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const mongoRefreshTokenRepository = new MongoRefreshTokenRepository()
                const jwtTokenManagement = new JwtTokenManagement(mongoRefreshTokenRepository, {
                    tokenSecret: process.env.JWT_TOKEN_SECRET!,
                    refreshTokenSecret:  process.env.JWT_REFRESH_TOKEN_SECRET!,
                })
                const userRepository = new PrismaUserRepository(prisma as PrismaClient)
                const loginUsecase = new LoginUsecase(userRepository, jwtTokenManagement)
                return await loginUsecase.execute(input)
            })
        }
        return {
            execute
        }
    }
}