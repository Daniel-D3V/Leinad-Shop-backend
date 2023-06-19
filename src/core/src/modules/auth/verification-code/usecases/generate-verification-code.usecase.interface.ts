import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface GenerateVerificationCodeUsecaseInterface extends UsecaseInterface {
    execute(data: GenerateVerificationCodeUsecaseInterface.InputDto): Promise<GenerateVerificationCodeUsecaseInterface.OutputDto>;
}

export namespace GenerateVerificationCodeUsecaseInterface {
    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], { id: string }>
}