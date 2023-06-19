import { EventEmitterInterface } from "@/modules/@shared/events";
import { VerificationCodeEntity } from "../../../domain/entities";
import { VerificationCodeRepositoryInterface } from "../../../repositories";
import { GenerateEmailVerificationCodeUsecaseInterface } from "../../../usecases";
import { left, right } from "@/modules/@shared/logic";
import { VerificationCodeAlreadyGeneratedError } from "./errors";
import { EmailVerificationCodeGeneratedEvent } from "./email-verification-code-generated.event";

export class GenerateEmailVerificationCodeUsecase implements GenerateEmailVerificationCodeUsecaseInterface {
    
    constructor(
        private readonly verificationCodeRepository: VerificationCodeRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) {}

    async execute({ userId }: GenerateEmailVerificationCodeUsecaseInterface.InputDto): Promise<GenerateEmailVerificationCodeUsecaseInterface.OutputDto> {
        
        const existingVerificationCode = await this.verificationCodeRepository.findByUserId(userId);
        if(existingVerificationCode) return left([ new VerificationCodeAlreadyGeneratedError() ])

        const verificationCodeEntity = VerificationCodeEntity.create({ userId });
        await this.verificationCodeRepository.create(verificationCodeEntity);

        const emailVerificationCodeGeneratedEvent = new EmailVerificationCodeGeneratedEvent({
            ...verificationCodeEntity.toJSON()
        })
        await this.eventEmitter.emit(emailVerificationCodeGeneratedEvent);

        return right({
            id: verificationCodeEntity.id,
        })
    }
}