import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface RegenerateEmailVerificationCodeUsecaseInterface extends UsecaseInterface {
    execute(data: RegenerateEmailVerificationCodeUsecaseInterface.InputDto): Promise<RegenerateEmailVerificationCodeUsecaseInterface.OutputDto>;
}

export namespace RegenerateEmailVerificationCodeUsecaseInterface {
    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], { id: string }>
}