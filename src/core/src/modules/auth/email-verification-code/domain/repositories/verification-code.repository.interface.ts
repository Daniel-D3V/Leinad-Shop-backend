import { VerificationCodeEntity } from "../entities";

export interface VerificationCodeRepositoryInterface {

    create(verificationCode: VerificationCodeEntity): Promise<void>
    findByCode(code: string): Promise<VerificationCodeEntity | null>
    findByUserId(userId: string): Promise<VerificationCodeEntity | null>
    deleteByCode(code: string): Promise<void>
}