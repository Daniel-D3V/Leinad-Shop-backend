import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface SetStatusOfflineUsecaseInterface extends UsecaseInterface {
    execute(input: SetStatusOfflineUsecaseInterface.InputDto): Promise<SetStatusOfflineUsecaseInterface.OutputDto>
}

export namespace SetStatusOfflineUsecaseInterface {

    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], null>
}