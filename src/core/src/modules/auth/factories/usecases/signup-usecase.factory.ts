import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import { SignupUsecase } from "../../application/usecases";
import { PrismaUserRepository } from "../../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { SignupUsecaseInterface } from "../../domain/usecases";
import { PrismaClient } from "@prisma/client";

export class SignupUsecaseFactory {

    static create(): SignupUsecaseInterface {

        const execute = async (input: SignupUsecaseInterface.InputDto) => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaUserRepository = new PrismaUserRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const signupUsecase = new SignupUsecase(prismaUserRepository, outboxEmitter)
                return await signupUsecase.execute(input)                   
            })                                                               
        }                           
        return {
            execute
        }
    }
}