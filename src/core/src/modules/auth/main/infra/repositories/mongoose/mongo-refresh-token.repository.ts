import { RefreshTokenRepositoryInterface } from "@/modules/auth/domain/repositories";
import { MongoRefreshTokenModel } from "./models";

export class MongoRefreshTokenRepository implements RefreshTokenRepositoryInterface {

    async storeRefreshToken(token: string, userId: string, expirationDate: Date): Promise<void> {


        const tokenCount = await MongoRefreshTokenModel.count({ userId: userId })
        if(tokenCount > 15) {
            const oldestToken = await MongoRefreshTokenModel.findOne({ userId: userId })
            .sort({ expirationDate: 1 }) 
            .limit(1);

            await MongoRefreshTokenModel.deleteOne({ refreshToken: oldestToken?.refreshToken ?? "" })
        }
        await MongoRefreshTokenModel.create([{ refreshToken: token, userId, expirationDate }])
    }
    async findRefreshToken(token: string): Promise<string | null> {
        const mongoRefreshToken = await MongoRefreshTokenModel.findOne({ refreshToken: token ?? "" })
        return mongoRefreshToken?.refreshToken ?? null
    }
    async deleteRefreshToken(token: string): Promise<void> {
        await MongoRefreshTokenModel.deleteOne({ refreshToken: token ?? "" })
    }
    
}