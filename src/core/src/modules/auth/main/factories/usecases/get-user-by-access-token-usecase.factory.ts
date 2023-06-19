import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { GetUserByAccessTokenUsecase, LoginUsecase } from "../../application/usecases"
import { GetUserByAccessTokenUsecaseInterface, LoginUsecaseInterface } from "../../domain/usecases"
import { MongoRefreshTokenRepository, PrismaUserRepository } from "../../infra/repositories"
import { JwtTokenManagement } from "../../infra/protocols"

export class GetUserByAccessTokenUsecaseFactory {

    static create(): GetUserByAccessTokenUsecaseInterface {

        const execute = async (input: GetUserByAccessTokenUsecaseInterface.InputDto) => {
            const mongoRefreshTokenRepository = new MongoRefreshTokenRepository()
            const jwtTokenManagement = new JwtTokenManagement(mongoRefreshTokenRepository, {
                tokenSecret: process.env.JWT_TOKEN_SECRET!,
                refreshTokenSecret:  process.env.JWT_REFRESH_TOKEN_SECRET!,
            })
            const userRepository = new PrismaUserRepository(prismaClient)
            const getUserByAccessTokenUsecase = new GetUserByAccessTokenUsecase(userRepository, jwtTokenManagement)
            return await getUserByAccessTokenUsecase.execute(input)
        }
        return {
            execute
        }
    }
}