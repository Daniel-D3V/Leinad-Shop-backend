import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { SignupUsecase } from "../../application/usecases";
import { PrismaUserRepository } from "../../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { SignupInputDto } from "../../application/usecases/signup/signup.dto";

export class SignupUsecaseFactory {

    static create(): SignupUsecase {

        const execute = async (input: SignupInputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaUserRepository = new PrismaUserRepository(prismaClient)
                const outboxEmitter = new OutboxEmitter(prismaClient)
                const signupUsecase = new SignupUsecase(prismaUserRepository, outboxEmitter)
                return await signupUsecase.execute(input)
            })
        }
        return {
            
        }
    }
}