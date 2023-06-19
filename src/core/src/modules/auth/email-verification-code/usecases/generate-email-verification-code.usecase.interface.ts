import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface GenerateEmailVerificationCodeUsecaseInterface extends UsecaseInterface {
    execute(data: GenerateEmailVerificationCodeUsecaseInterface.InputDto): Promise<GenerateEmailVerificationCodeUsecaseInterface.OutputDto>;
}

export namespace GenerateEmailVerificationCodeUsecaseInterface {
    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], { id: string }>
}