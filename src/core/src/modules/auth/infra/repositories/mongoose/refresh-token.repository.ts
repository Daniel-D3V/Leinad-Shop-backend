import { RefreshTokenRepositoryInterface } from "@/modules/auth/domain/repositories";

export class RefreshTokenRepository implements RefreshTokenRepositoryInterface {
    storeRefreshToken(token: string, expirationDate: Date): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findRefreshToken(token: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    deleteRefreshToken(token: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}