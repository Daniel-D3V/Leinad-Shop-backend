import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface SetDefaultStatusOptionUsecaseInterface extends UsecaseInterface {
    execute(input: SetDefaultStatusOptionUsecaseInterface.InputDto): Promise<SetDefaultStatusOptionUsecaseInterface.OutputDto>
}

export namespace SetDefaultStatusOptionUsecaseInterface {

    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], null>
}