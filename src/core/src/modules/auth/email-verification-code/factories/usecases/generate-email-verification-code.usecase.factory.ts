import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { GenerateEmailVerificationCodeUsecase } from "../../application/usecases";
import { GenerateEmailVerificationCodeUsecaseInterface } from "../../domain/usecases";
import { MongoVerificationCodeRepository } from "../../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";

export class GenerateEmailVerificationCodeUsecaseFactory {

    static create(): GenerateEmailVerificationCodeUsecaseInterface {

        const mongoVerificationCodeRepository = new MongoVerificationCodeRepository()
        const outboxEmitter = new OutboxEmitter(prismaClient)
        const generateEmailVerificationCodeUsecase = new GenerateEmailVerificationCodeUsecase(
            mongoVerificationCodeRepository,
            outboxEmitter
        )
        return generateEmailVerificationCodeUsecase
    }
}