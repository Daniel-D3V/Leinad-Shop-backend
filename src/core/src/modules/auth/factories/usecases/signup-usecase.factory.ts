import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { SignupUsecase } from "../../application/usecases";
import { PrismaUserRepository } from "../../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";

export class SignupUsecaseFactory {

    static create(): SignupUsecaseFactory {

        const execute = () => {

            const prismaUserRepository = new PrismaUserRepository(prismaClient)
            const outboxEmitter = new OutboxEmitter(prismaClient)
            const signupUsecase = new SignupUsecase(prismaUserRepository, outboxEmitter)
        }
        return {
            
        }
    }
}