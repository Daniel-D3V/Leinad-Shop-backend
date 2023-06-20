export interface AuthUserFacadeInterface {
    isEmailVerified(userId: string): Promise<boolean> 
    getEmailByUserId(userId: string): Promise<string | null>
}