import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface SetIdleStatusOptionUsecaseInterface extends UsecaseInterface {
    execute(input: SetIdleStatusOptionUsecaseInterface.InputDto): Promise<SetIdleStatusOptionUsecaseInterface.OutputDto>
}

export namespace SetIdleStatusOptionUsecaseInterface {

    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], null>
}