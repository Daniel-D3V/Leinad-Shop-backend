import { RefreshTokenUsecase } from "../../application/usecases"
import {  RefreshTokenUsecaseInterface } from "../../domain/usecases"
import { MongoRefreshTokenRepository } from "../../infra/repositories"
import { JwtTokenManagement } from "../../infra/protocols"

export class RefreshTokenUsecaseFactory {

    static create(): RefreshTokenUsecaseInterface {

        const execute = async (input: RefreshTokenUsecaseInterface.InputDto) => {
            const mongoRefreshTokenRepository = new MongoRefreshTokenRepository()
            const jwtTokenManagement = new JwtTokenManagement(mongoRefreshTokenRepository, {
                tokenSecret: process.env.JWT_TOKEN_SECRET!,
                refreshTokenSecret:  process.env.JWT_REFRESH_TOKEN_SECRET!,
            })
            const refreshTokenUsecase = new RefreshTokenUsecase( jwtTokenManagement)
            return await refreshTokenUsecase.execute(input)
            
        }
        return {
            execute
        }
    }
}