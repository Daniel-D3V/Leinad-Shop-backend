import { VerificationCodeEntity } from "../../../domain/entities";
import { VerificationCodeRepositoryInterface } from "../../../domain/repositories";


export class MongoVerificationCodeRepository implements VerificationCodeRepositoryInterface {
    
    
    async create(verificationCode: VerificationCodeEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findByCode(code: string): Promise<VerificationCodeEntity | null> {
        throw new Error("Method not implemented.");
    }
    async findByUserId(userId: string): Promise<VerificationCodeEntity | null> {
        throw new Error("Method not implemented.");
    }
    async deleteByCode(code: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}