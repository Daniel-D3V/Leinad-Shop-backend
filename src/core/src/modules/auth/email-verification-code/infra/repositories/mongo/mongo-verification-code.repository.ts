import { VerificationCodeEntity } from "../../../domain/entities";
import { VerificationCodeRepositoryInterface } from "../../../domain/repositories";
import { MongoVerificationCodeModel, IVerificationCodeModel } from "./models";

class MongoVerificationCodeMapper {
    static toDomain(mongoVerificationCodeModel: VerificationCodeEntity.PropsJSON): VerificationCodeEntity {
        const verificationCodeEntity = VerificationCodeEntity.create({
            code: mongoVerificationCodeModel.code,
            userId: mongoVerificationCodeModel.userId,
            expirationDate: mongoVerificationCodeModel.expirationDate
        }, mongoVerificationCodeModel.id)
        return verificationCodeEntity
    }
}

export class MongoVerificationCodeRepository implements VerificationCodeRepositoryInterface {
    
    
    async create(verificationCode: VerificationCodeEntity): Promise<void> {
        await MongoVerificationCodeModel.create([ {
            ...verificationCode.toJSON()
        } ])
    }
    async findByCode(code: string): Promise<VerificationCodeEntity | null> {
        const mongoVerificationCode = await MongoVerificationCodeModel.findOne({
            code: code ?? ""
        }) 
        if(!mongoVerificationCode) return null
        return MongoVerificationCodeMapper.toDomain({
            id: mongoVerificationCode?.id ?? "",
            code: mongoVerificationCode?.code ?? "",
            userId: mongoVerificationCode?.userId ?? "",
            expirationDate: mongoVerificationCode?.expirationDate ?? new Date()
        })
    }
    async findByUserId(userId: string): Promise<VerificationCodeEntity | null> {
        const mongoVerificationCode = await MongoVerificationCodeModel.findOne({
            userId: userId ?? ""
        }) 
        if(!mongoVerificationCode) return null
        return MongoVerificationCodeMapper.toDomain({
            id: mongoVerificationCode?.id ?? "",
            code: mongoVerificationCode?.code ?? "",
            userId: mongoVerificationCode?.userId ?? "",
            expirationDate: mongoVerificationCode?.expirationDate ?? new Date()
        })
    }
    async deleteByCode(code: string): Promise<void> {
        await MongoVerificationCodeModel.deleteOne({
            code: code ?? ""
        })
    }

}