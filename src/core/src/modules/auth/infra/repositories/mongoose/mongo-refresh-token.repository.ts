import { RefreshTokenRepositoryInterface } from "@/modules/auth/domain/repositories";
import { MongoRefreshTokenModel } from "./models";

export class MongoRefreshTokenRepository implements RefreshTokenRepositoryInterface {

    async storeRefreshToken(token: string, expirationDate: Date): Promise<void> {
        await MongoRefreshTokenModel.create([{ refreshToken: token, expirationDate }], { expirationDate })
    }
    async findRefreshToken(token: string): Promise<string | null> {
        const mongoRefreshToken = await MongoRefreshTokenModel.findOne({ refreshToken: token ?? "" })
        return mongoRefreshToken?.refreshToken ?? null
    }
    async deleteRefreshToken(token: string): Promise<void> {
        await MongoRefreshTokenModel.deleteOne({ refreshToken: token ?? "" })
    }
    
}