import { OutboxEmitter } from "@/modules/@shared/infra/providers";
import {  VerifyEmailUsecase } from "../../application/usecases";
import { PrismaUserRepository } from "../../infra/repositories";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import {  VerifyEmailUsecaseInterface } from "../../domain/usecases";
import { PrismaClient } from "@prisma/client";

export class VerifyEmailUsecaseFactory {

    static create(): VerifyEmailUsecaseInterface {

        const execute = async (input: VerifyEmailUsecaseInterface.InputDto): Promise<VerifyEmailUsecaseInterface.OutputDto> => {
            return await prismaClient.$transaction(async (prisma) => {
                const prismaUserRepository = new PrismaUserRepository(prisma as PrismaClient)
                const outboxEmitter = new OutboxEmitter(prisma as PrismaClient)
                const signupUsecase = new VerifyEmailUsecase(prismaUserRepository, outboxEmitter)
                return await signupUsecase.execute(input)                   
            })                                                               
        }                           
        return {
            execute
        }
    }
}