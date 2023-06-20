import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface Validate2faUsecaseInterface extends UsecaseInterface {
    execute(data: Validate2faUsecaseInterface.InputDto): Promise<Validate2faUsecaseInterface.OutputDto>;
}

export namespace Validate2faUsecaseInterface {
    export type InputDto = {
        userId: string
        token: string
    }

    export type OutputDto = Either<Error[], null>
}