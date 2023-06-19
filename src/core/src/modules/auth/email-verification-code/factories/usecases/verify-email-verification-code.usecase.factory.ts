import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { VerifyEmailVerificationCodeUsecase } from "../../application/usecases";
import { VerifyEmailVerificationCodeUsecaseInterface } from "../../domain/usecases";
import { MongoVerificationCodeRepository } from "../../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";

export class VerifyEmailVerificationCodeUsecaseFactory {

    static create(): VerifyEmailVerificationCodeUsecaseInterface {

        const mongoVerificationCodeRepository = new MongoVerificationCodeRepository()
        const outboxEmitter = new OutboxEmitter(prismaClient)
        const generateEmailVerificationCodeUsecase = new VerifyEmailVerificationCodeUsecase(
            mongoVerificationCodeRepository,
            outboxEmitter
        )
        return generateEmailVerificationCodeUsecase
    }
}