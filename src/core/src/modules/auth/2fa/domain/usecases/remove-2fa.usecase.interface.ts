import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface Remove2faUsecaseInterface extends UsecaseInterface {
    execute(data: Remove2faUsecaseInterface.InputDto): Promise<Remove2faUsecaseInterface.OutputDto>;
}

export namespace Remove2faUsecaseInterface {
    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], null>
}