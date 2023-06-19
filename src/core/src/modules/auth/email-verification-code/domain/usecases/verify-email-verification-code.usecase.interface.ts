import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface VerifyEmailVerificationCodeUsecaseInterface extends UsecaseInterface {
    execute(data: VerifyEmailVerificationCodeUsecaseInterface.InputDto): Promise<VerifyEmailVerificationCodeUsecaseInterface.OutputDto>;
}

export namespace VerifyEmailVerificationCodeUsecaseInterface {
    export type InputDto = {
        code: string
    }

    export type OutputDto = Either<Error[], null>
}