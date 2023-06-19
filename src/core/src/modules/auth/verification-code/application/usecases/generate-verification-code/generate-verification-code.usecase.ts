import { EventEmitterInterface } from "@/modules/@shared/events";
import { VerificationCodeEntity } from "../../../domain/entities";
import { VerificationCodeRepositoryInterface } from "../../../repositories";
import { GenerateVerificationCodeUsecaseInterface } from "../../../usecases/generate-verification-code.usecase.interface";
import { left, right } from "@/modules/@shared/logic";
import { VerificationCodeAlreadyGeneratedError } from "./errors";
import { VerificationCodeGeneratedEvent } from "./verification-code-generated.event";

export class GenerateVerificationCodeUsecase implements GenerateVerificationCodeUsecaseInterface {
    
    constructor(
        private readonly verificationCodeRepository: VerificationCodeRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) {}

    async execute({ userId }: GenerateVerificationCodeUsecaseInterface.InputDto): Promise<GenerateVerificationCodeUsecaseInterface.OutputDto> {
        
        const existingVerificationCode = await this.verificationCodeRepository.findByUserId(userId);
        if(existingVerificationCode) return left([ new VerificationCodeAlreadyGeneratedError() ])

        const verificationCodeEntity = VerificationCodeEntity.create({ userId });
        await this.verificationCodeRepository.create(verificationCodeEntity);

        const verificationCodeGeneratedEvent = new VerificationCodeGeneratedEvent({
            ...verificationCodeEntity.toJSON()
        })
        await this.eventEmitter.emit(verificationCodeGeneratedEvent);

        return right({
            id: verificationCodeEntity.id,
        })
    }
}