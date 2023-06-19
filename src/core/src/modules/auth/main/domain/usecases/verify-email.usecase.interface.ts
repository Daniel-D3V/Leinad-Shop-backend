import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface VerifyEmailUsecaseInterface extends UsecaseInterface {
    execute(input: VerifyEmailUsecaseInterface.InputDto): Promise<VerifyEmailUsecaseInterface.OutputDto>
}

export namespace VerifyEmailUsecaseInterface {
    export type InputDto = {
        userId: string
    }

    export type OutputDto =Either<Error[], null>
}