import { PrismaClient } from "@prisma/client";
import { AuthTokenFacadeInterface } from "../../facades";
import { AuthTokenFacadeImp, AuthUserFacadeImp } from "../../infra/facades";
import { MongoRefreshTokenRepository, PrismaUserRepository } from "../../infra/repositories";
import { JwtTokenManagement } from "../../infra/protocols";


export class AuthTokenFacadeFactory {
    
    static create(prismaClient: PrismaClient): AuthTokenFacadeInterface {
        
        const userRepository =  new PrismaUserRepository(prismaClient)
        const mongoRefreshTokenRepository = new MongoRefreshTokenRepository()
        const jwtTokenManagement = new JwtTokenManagement(
            mongoRefreshTokenRepository, {
            tokenSecret: process.env.JWT_TOKEN_SECRET!,
            refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET!,
        })
        const authTokenFacadeImp = new AuthTokenFacadeImp(
            userRepository,
            jwtTokenManagement
        )
        return authTokenFacadeImp;
    }
}