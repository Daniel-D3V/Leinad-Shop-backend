import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { GenerateEmailVerificationCodeUsecase } from "../../application/usecases";
import { GenerateEmailVerificationCodeUsecaseInterface } from "../../domain/usecases";
import { MongoVerificationCodeRepository } from "../../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { AuthUserFacadeFactory } from "@/modules/auth/main/factories";

export class GenerateEmailVerificationCodeUsecaseFactory {

    static create(): GenerateEmailVerificationCodeUsecaseInterface {

        const mongoVerificationCodeRepository = new MongoVerificationCodeRepository()
        const outboxEmitter = new OutboxEmitter(prismaClient)
        const authUserFacade = AuthUserFacadeFactory.create(prismaClient)
        const generateEmailVerificationCodeUsecase = new GenerateEmailVerificationCodeUsecase(
            mongoVerificationCodeRepository,
            authUserFacade,
            outboxEmitter
        )
        return generateEmailVerificationCodeUsecase
    }
}