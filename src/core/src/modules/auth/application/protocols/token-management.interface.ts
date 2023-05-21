import { Either } from "@/modules/@shared/logic";
import { TokenPayloadModel } from "../models";

export interface TokenManagementInterface {

    generateToken(payload: TokenPayloadModel): Promise<string>
    verifyToken(token: string): Promise<Either<Error[], TokenPayloadModel>>
    generateRefreshToken(payload: TokenPayloadModel): Promise<string>
    verifyRefreshToken(token: string): Promise<Either<Error[], TokenPayloadModel>>
    generateAccessTokenFromRefreshToken(refreshToken: string): Promise<Either<Error[], string>>
}