import { left, right } from "@/modules/@shared/logic";
import { VerificationCodeRepositoryInterface } from "../../../repositories";
import { GenerateEmailVerificationCodeUsecaseInterface, RegenerateEmailVerificationCodeUsecaseInterface } from "../../../usecases";
import { VerificationCodeNotFoundError } from "../_errors";

export class RegenerateEmailVerificationCodeUsecase implements RegenerateEmailVerificationCodeUsecaseInterface {

    constructor(
        private readonly verificationCodeRepository: VerificationCodeRepositoryInterface,
        private readonly generateEmailVerificationCodeUsecase: GenerateEmailVerificationCodeUsecaseInterface
    ){}

    async execute({ userId }: RegenerateEmailVerificationCodeUsecaseInterface.InputDto): Promise<RegenerateEmailVerificationCodeUsecaseInterface.OutputDto> {
        
        const verificationCodeEntity = await this.verificationCodeRepository.findByUserId(userId);
        if(!verificationCodeEntity) return left([ new VerificationCodeNotFoundError() ])

        await this.verificationCodeRepository.deleteByCode(verificationCodeEntity.code);

        const output = await this.generateEmailVerificationCodeUsecase.execute({ userId });
        if(output.isLeft()) return left(output.value)

        return right({
            id: output.value.id,
        })
    }
}