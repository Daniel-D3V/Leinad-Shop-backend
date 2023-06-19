import { left, right } from "@/modules/@shared/logic";
import { VerifyEmailVerificationCodeUsecaseInterface } from "../../../usecases";
import { VerificationCodeRepositoryInterface } from "../../../repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { VerificationCodeExpiredError, VerificationCodeNotFoundError } from "../_errors";
import { EmailVerifiedEvent } from "./email-verified.event";

export class VerifyEmailVerificationCodeUsecase implements VerifyEmailVerificationCodeUsecaseInterface {

    constructor(
        private readonly verificationCodeRepository: VerificationCodeRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ code }: VerifyEmailVerificationCodeUsecaseInterface.InputDto): Promise<VerifyEmailVerificationCodeUsecaseInterface.OutputDto> {
        
        const verificationCode = await this.verificationCodeRepository.findByCode(code)
        if(!verificationCode) return left([ new VerificationCodeNotFoundError() ])

        if(verificationCode.isExpired()) return left([ new VerificationCodeExpiredError() ])

        await this.verificationCodeRepository.deleteByCode(code)

        const emailVerifiedEvent = new EmailVerifiedEvent({
            userId: verificationCode.userId
        })
        await this.eventEmitter.emit(emailVerifiedEvent)

        return right(null)
    }
}