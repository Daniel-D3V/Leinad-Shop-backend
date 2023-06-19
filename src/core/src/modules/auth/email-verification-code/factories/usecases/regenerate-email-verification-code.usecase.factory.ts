import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { GenerateEmailVerificationCodeUsecase, RegenerateEmailVerificationCodeUsecase } from "../../application/usecases";
import { RegenerateEmailVerificationCodeUsecaseInterface } from "../../domain/usecases";
import { MongoVerificationCodeRepository } from "../../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";

export class RegenerateEmailVerificationCodeUsecaseFactory {

    static create(): RegenerateEmailVerificationCodeUsecaseInterface {

        const mongoVerificationCodeRepository = new MongoVerificationCodeRepository()
        const outboxEmitter = new OutboxEmitter(prismaClient)
        const generateEmailVerificationCodeUsecase = new GenerateEmailVerificationCodeUsecase(
            mongoVerificationCodeRepository,
            outboxEmitter
        )

        const regenerateEmailVerificationCodeUsecase = new RegenerateEmailVerificationCodeUsecase(
            mongoVerificationCodeRepository,
            generateEmailVerificationCodeUsecase
        )
        return regenerateEmailVerificationCodeUsecase
    }
}