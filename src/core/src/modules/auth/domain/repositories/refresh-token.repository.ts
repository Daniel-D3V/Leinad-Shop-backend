export interface RefreshTokenRepositoryInterface {
    storeRefreshToken(token: string, expirationDate: Date): Promise<void>
    findRefreshToken(token: string): Promise<string | null>
    deleteRefreshToken(token: string): Promise<void>
}