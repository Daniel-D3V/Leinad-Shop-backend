export interface AuthUserFacadeInterface {
    isEmailVerified(userId: string): Promise<boolean> 
}