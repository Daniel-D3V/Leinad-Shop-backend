import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface Verify2faCodeUsecaseInterface extends UsecaseInterface {
    execute(data: Verify2faCodeUsecaseInterface.InputDto): Promise<Verify2faCodeUsecaseInterface.OutputDto>;
}

export namespace Verify2faCodeUsecaseInterface {
    export type InputDto = {
        temporaryToken: string
        code: string
    }

    export type OutputDto = Either<Error[], null>
}